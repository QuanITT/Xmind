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
    const child = service.getChildrenProperties();
    console.log(child);

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx && child) {
      this.drawOnCanvas(ctx, child);
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
