import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'D3-chart';

  @ViewChild('chart', { static: true }) public chartContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.createPackedBubbleChart();
  }

  private createPackedBubbleChart(): void {
    const data = {
      name: "Sentiments",
      children: [
        { name: "Disappointingasdasdasd", value: 20, label: 'Negative', flag: false, color: '#ff4d4f' },
        { name: "Ugly", value: 8.2, label: 'Negative', flag: false, color: '#ff4d4f' },
        { name: "Terrible", value: 9.2, label: 'Negative', flag: false, color: '#ff4d4f' },
        { name: "Bad", value: 14, label: 'Negative', flag: false, color: '#52c41a' },
        { name: "Horrible", value: 9.2, label: 'Negative', flag: false, color: '#ff4d4f' },
        { name: "Sad", value: 9.2, label: 'Negative', flag: false, color: '#ff4d4f' },
        { name: "Neutral", value: 8.2, label: 'Neutral', flag: false, color: '#ffc53d' },
        { name: "Average", value: 8.2, label: 'Neutral', flag: false, color: '#ffc53d' },
        { name: "Good", value: 8, label: 'Positive', flag: true, color: '#52c41a' },
        { name: "Amazing", value: 8.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Fantastic", value: 9.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Great", value: 8.5, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Joyful", value: 8.4, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Neutral", value: 8.2, label: 'Neutral', flag: false, color: '#ffc53d' },
        { name: "Average", value: 8.6, label: 'Neutral', flag: false, color: '#ffc53d' },
        { name: "Good", value: 8.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Amazing", value: 9.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Fantastic", value: 9.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Great", value: 9.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Joyful", value: 9.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Neutral", value: 8.2, label: 'Neutral', flag: false, color: '#ffc53d' },
        { name: "Average", value: 9.2, label: 'Neutral', flag: false, color: '#ffc53d' },
        { name: "Good", value: 8.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Amazing", value: 9.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "Fantastic", value: 9.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 0.5, label: 'Neutral', flag: false, color: '#ffc53d' },
        { name: "", value: 1, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 1.5, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 3, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 3.4, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 0.5, label: 'Neutral', flag: false, color: '#ffc53d' },
        { name: "", value: 1.5, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 2.2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 1.5, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 2.5, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 0.5, label: 'Neutral', flag: false, color: '#ffc53d' },
        { name: "", value: 0.7, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 1.5, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 1, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 1.5, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 1, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 2, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 1.5, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 1.5, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 0.5, label: 'Neutral', flag: false, color: '#ffc53d' },
        { name: "", value: 2.5, label: 'Positive', flag: false, color: '#52c41a' },
        { name: "", value: 2.5, label: 'Positive', flag: false, color: '#52c41a' },
      ]
    };

    const width = 500;
    const height = 500;

    const svg = d3.select(this.chartContainer.nativeElement)
      .on("load", (event: any) => {
        console.log('event', event)
      })
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    const bubble = d3.pack()
      .size([width, height])
      .padding(12)

    const root: any = d3.hierarchy(data)
      .sum((d: any) => d.value);

    const node = svg.selectAll('.node')
      .data(bubble(root).leaves())
      .enter().append('g')
      .attr('class', 'node')
      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)
      .style('cursor', 'pointer')
      .style('width', 60)
      .style('overflow', 'hidden')
      .style('white-space', 'nowrap')
      .style('text-overflow', 'ellipsis')

    node.append('circle')
      .attr('r', d => d.r)
      .attr('fill', (d: any) => {
        return (d.data.color)
      })

      .classed('demo-styling', function (d: any) {
        if (d.data.value > 10) {
          return true;
        }
        return false;
      })

      .on('click', function (event, d) {
        highlightBubble(event, d);
      })

      .on('DOMActivate', function (event: any) {
        console.log('event', event);
      })

    node.append('text')
      .attr('dy', '0.3em')
      .style('text-anchor', 'middle')
      .text((d: any) => d.data.name)
      .attr('font-size', d => `${d.r / 3}px`)
      .attr('fill', 'black')
      .style('width', 60)
      .style('overflow', 'hidden')
      .style('word-break', 'break-all')
      .style('white-space', 'nowrap')
      .style('text-overflow', 'ellipsis')
      .text((d: any) => {
        const text = d.data.name;
        const radius = d.r;
        const maxChars = Math.floor(radius / 4);
        return text.length > maxChars ? `${text.slice(0, maxChars)}...` : text;
      })


    const simulation = d3.forceSimulation(root.leaves())
      .force('charge', d3.forceManyBody().strength(10))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05))
      .force('collision', d3.forceCollide().radius((d: any) => d.r + 2))
      .on('tick', () => {
        node.attr('transform', d => `translate(${d.x},${d.y})`);
      });

    // const highlightBubble = (event: any, d?: any) => {
    //   // console.log('event', event, 'd', d);
    //   svg.selectAll('circle')
    //     .attr('fill', (d: any) => {
    //       // Apply colors based on the sentiment categories
    //       if (d.parent.data.name === 'Negative') return '#ff4d4f';
    //       if (d.parent.data.name === 'Neutral') return '#ffc53d';
    //       if (d.parent.data.name === 'Positive') return '#52c41a';
    //       return d3.select(event.currentTarget).attr('fill');
    //     })

    //     // .attr('opacity', 0.8)
    //     // .attr('stroke', 'none');

    //   d3.select(event.currentTarget)
    //     .attr('fill', '#ff7f0e')
    //     .attr('opacity', 1)
    //     .attr('stroke', 'black')
    //     .attr('stroke-width', 2)
    //     .attr('stroke-opacity', 1);
    // };

    const highlightBubble = (event: any, d?: any) => {
      svg.selectAll('circle')
        // .attr('fill', (d: any) => {
        //   if (d.data.label === 'Negative') return '#ff4d4f';
        //   if (d.data.label === 'Neutral') return '#ffc53d';
        //   if (d.data.label === 'Positive') return '#52c41a';
        //   return '#69b3a2';
        // })
        .attr('fill', function (d: any) {
          return (d.data.color)
        })
        .attr('opacity', 0.9)
        .attr('class', 'none')
        .attr('stroke', 'none')
        .style('outline', 'none')
      // .attr('class', 'none')


      d3.select(event.currentTarget)
        // .attr('fill', (d: any) => {
        //   if (d.data.label === 'Negative') return '#ff4d4f';
        //   if (d.data.label === 'Neutral') return '#ffc53d';
        //   if (d.data.label === 'Positive') return '#52c41a';
        //   return '#69b3a2';
        // })
        .attr('fill', function (d: any) {
          return (d.data.color)
        })
        .attr('opacity', 1)
        // .attr('stroke', '#333')
        .attr('stroke', (d: any) => {
          return ('transparent')
        })
        // .attr('stroke-width', 2)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 1)
        .style("outline", function (d: any) {
          return `1px solid ${d.data.color}`;
        })
        .classed('outerNode', function (d: any) {
          return true;
        })
    };
  }
}
