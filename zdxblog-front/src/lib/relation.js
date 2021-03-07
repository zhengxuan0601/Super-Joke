/**
 * @para {data}
 * data: {width: Number, height: Number id: String, nodes: Array, links: Array}
 */
import * as d3 from 'd3'
export default class Relation {
  constructor (data) {
    this.data = data
    this.svg = d3.select(this.data.id).append('svg').attr('width', this.data.width).attr('height', this.data.height)
    this.margin = { top: 10, bottom: 10, left: 10, right: 10 }
    this.r = 16
  }

  /* 初始化力导向图 */
  init () {
    let g = this.svg.append('g')
    this.forceSimulation = d3.forceSimulation()
      .force('link', d3.forceLink())
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter())
    this.forceSimulation.nodes(this.data.nodes)
      .on('tick', this.ticked)

    /* 生成边数据 */
    this.forceSimulation.force('link')
      .id(d => d.id)
      .links(this.data.links)
      .distance(80)

    /* 设置图形的中心位置 */
    this.forceSimulation.force('center')
      .x(this.data.width / 2)
      .y(this.data.height / 2)
    this.drawLines(g)
    this.createGs(g)
    this.drawPattern(g)
    this.drawLinkText(g)
  }

  /* 绘制边 */
  drawLines (g) {
    this.links = g.append('g')
      .selectAll('line')
      .data(this.data.links)
      .enter()
      .append('line')
      .attr('stroke', '#f1f1f1')
      .attr('stroke-width', 1)
  }

  /* 绘制边上的文字 */
  drawLinkText (g) {
    this.linksText = g.append('g')
      .selectAll('text')
      .data(this.data.links)
      .enter()
      .append('text')
      .attr('fill', '#4c4c4c')
      .attr('font-size', '11px')
      .text(d => ``)
  }

  /* 建立用来放在每个节点和对应文字的分组<g> */
  createGs (g) {
    this.gs = g.selectAll('.circleText')
      .data(this.data.nodes)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        var cirX = d.x
        var cirY = d.y
        return 'translate(' + cirX + ',' + cirY + ')'
      })
      .call(d3.drag()
        .on('start', this.started)
        .on('drag', this.dragged)
        .on('end', this.ended)
      )
    this.drawNodes()
    this.drawText()
  }

  /* 绘制节点 */
  drawNodes () {
    this.gs.append('circle')
      .attr('r', this.r)
      .attr('fill', '#fff')
    this.gs.append('circle')
      .attr('r', this.r)
      .attr('stroke', '#f1f1f1')
      .attr('stroke-width', '1px')
      .style('fill', d => 'url(#' + 'pattern' + d.id + ')')
  }

  /* 绘制文字 */
  drawText () {
    this.gs.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', 24)
      .attr('fill', '#4c4c4c')
      .attr('font-size', '8px')
      .attr('text-anchor', 'middle')
      .text(d => d.id)
  }

  /* 节点图片填充 */
  drawPattern (gContainer) {
    let gPattern = gContainer.append('g').attr('class', 'g-pattern')
    let pattern = gPattern.selectAll('pattern').data(this.data.nodes, d => 'pattern' + d.id)
    pattern
      .enter()
      .append('pattern')
      .attr('id', d => 'pattern' + d.id)
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', 24)
      .attr('width', 24)
      .append('svg:image')
      .attr('class', 'imgs')
    d3
      .selectAll('.imgs')
      .data(this.data.nodes, d => 'pattern-image' + d.id)
      .attr('preserveAspectRatio', 'none')
      .attr('xlink:href', d => d.img)
      .attr('x', this.r - 12)
      .attr('y', this.r - 12)
      .attr('height', 24)
      .attr('width', 24)
  }

  ticked = () => {
    this.links
      .attr('x1', d => this.validateXY(d.source.x, 'x'))
      .attr('y1', d => this.validateXY(d.source.y, 'y'))
      .attr('x2', d => this.validateXY(d.target.x, 'x'))
      .attr('y2', d => this.validateXY(d.target.y, 'y'))
    this.linksText
      .attr('x', d => (d.source.x + d.target.x) / 2)
      .attr('y', d => (d.source.y + d.target.y) / 2)
      .attr('text-anchor', 'middle')
      .attr('transform', d => this.caluateRotate(d.source, d.target, (d.source.x + d.target.x) / 2, (d.source.y + d.target.y) / 2))
    this.gs
      .attr('transform', d => 'translate(' + this.validateXY(d.x, 'x') + ',' + this.validateXY(d.y, 'y') + ')')
  }

  started = (d) => {
    if (!d3.event.active) {
      this.forceSimulation.alphaTarget(0.8).restart() // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
    }
    d.fx = d.x
    d.fy = d.y
  }
  dragged = (d) => {
    d.fx = this.validateXY(d3.event.x, 'x')
    d.fy = this.validateXY(d3.event.y, 'y')
  }
  ended = (d) => {
    if (!d3.event.active) {
      this.forceSimulation.alphaTarget(0)
    }
    d.fx = null
    d.fy = null
  }

  /* 边界处理 */
  validateXY (val, type) {
    var r = 28
    if (val < r) {
      if (type === 'x') return r + 10
      else return r
    }
    if (type === 'x') {
      if (val > this.data.width - r) return this.data.width - r - 10
    } else {
      if (val > this.data.height - r - 10) return this.data.height - r - 10
    }
    return val
  }

  /* 计算边上文字需要旋转的角度 */
  caluateRotate (source, target, x, y) {
    const absX = source.x - target.x
    const absY = source.y - target.y
    const tanEdg = absY / absX
    const rotateEdg = Math.atan(tanEdg) * 180 / Math.PI
    return `rotate(${rotateEdg}, ${x}, ${y})`
  }
}
