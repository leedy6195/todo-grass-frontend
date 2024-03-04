<template>
  <div class="todo-heatmap">
    <svg ref="svg"></svg>
    <div id="tooltip" class="tooltip"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'TodoHeatmap',
  data() {
    return {
      cellSize: 10, // 사각형의 크기
      commits: [] // 데이터는 생성함수를 통해 초기화할 것입니다.
    };
  },
  mounted() {
    this.commits = this.generateData();
    this.drawHeatmap();
  },
  methods: {
    drawHeatmap() {
      const svg = d3.select(this.$refs.svg);
      const width = Math.ceil(this.commits.length / 7) * this.cellSize;
      const height = 8 * this.cellSize;

      const colorScale = d3.scaleSequential(d3.interpolateGreens)
          .domain([0, d3.max(this.commits, d => d.count)]);

      svg.attr('width', width)
          .attr('height', height);

      svg.selectAll('rect')
          .data(this.commits)
          .enter()
          .append('rect')
          .attr('x', (d, i) => Math.floor(i / 7) * this.cellSize)
          .attr('y', (d, i) => (i % 7) * this.cellSize)
          .attr('width', this.cellSize)
          .attr('height', this.cellSize)
          .attr('rx', 3) // rounded 네모칸
          .attr('ry', 3) // rounded 네모칸
          .attr('fill', d => colorScale(d.count))
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .on('mouseover', (event, d) => {
            this.showTooltip(event, d);
          })
          .on('mouseout', () => {
            this.hideTooltip();
          });
    },
    showTooltip(event, d) {
      const tooltip = d3.select('#tooltip');
      const svgRect = this.$refs.svg.getBoundingClientRect(); // SVG 요소의 절대 좌표 가져오기
      let offsetX = event.pageX - svgRect.left; // SVG 요소 내에서의 마우스 X 좌표 계산
      let offsetY = event.pageY - svgRect.top - 50; // SVG 요소 내에서의 마우스 Y 좌표 계산


      tooltip.html(`<div class="tooltip-content">
                  <div class="tooltip-date">${d.date}</div>
                  <div class="tooltip-count">Count: ${d.count}</div>
                </div>`)
          .style('left', `${offsetX}px`)
          .style('top', `${offsetY}px`)
          .style('opacity', 1);
    },
    hideTooltip() {
      d3.select('#tooltip').style('opacity', 0);
    },
    generateData() {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 365); // 현재 날짜로부터 1년 전 날짜 계산
      const endDate = new Date();

      const data = [];
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().slice(0, 10);
        const count = Math.floor(Math.random() * 10); // 랜덤한 커밋 수 생성

        data.push({date: dateString, count});
        currentDate.setDate(currentDate.getDate() + 1); // 다음 날짜로 이동
      }

      return data;
    }
  }
};
</script>

<style scoped>
.todo-heatmap {
  width: 100%;
  height: 100%;
}

.tooltip {
  position: absolute;
  background-color: #1b1f23;
  color: #f0f6fc;
  border: 1px solid #6a737d;
  padding: 8px;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  opacity: 0; /* 초기에는 툴팁을 숨김 */
  pointer-events: none; /* 툴팁이 이벤트를 가로채지 않도록 함 */
}

.tooltip-content {
  display: flex;
  flex-direction: column;
}

.tooltip-date {
  font-weight: bold;
  margin-bottom: 4px;
}

.tooltip-count {
  color: #8b949e;
}
</style>
