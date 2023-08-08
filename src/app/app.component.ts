import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { XmindService } from './xmind.service';
import { DrawService } from './draw.service';
import { rootTopic } from 'src/Xmind/rootTopic';
import { baseTopic } from 'src/Xmind/baseTopic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvasElement', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  title = 'xmind';
  serviceData: any;
  constructor() {}
  ngAfterViewInit() {
    const service = new XmindService();
    service.createNewFile();
    const children = service.getOrganizedTopics();//service.getChildrenProperties();
    console.log(children);
    const dataset = children.map(child => ({
      title: child.title,
      x: child.position.x,
      y: child.position.y,
      width: child.width,
      height: child.height
    }));


    console.log(dataset);
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx && dataset) {
      this.drawOnCanvas(ctx, dataset);
    }
  }
  drawOnCanvas(
    ctx: CanvasRenderingContext2D,
    child: {
      title: string;
      x: number;
      y: number;
      width: number;
      height: number;
    }[]
  ) {
    child.forEach((e) => {
      ctx.strokeRect(e.x, e.y, e.width, e.height);
      ctx.fillText(e.title, 10, 10);

    });
  }
}
