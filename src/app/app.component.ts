import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { XmindService } from './xmind.service';
import { DrawService } from './draw.service';
import { rootTopic } from 'src/Xmind/rootTopic';
import { baseTopic } from 'src/Xmind/baseTopic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  view: [number, number] = [1500, 1500];
  nodes: any[] = [];
  links: any[] = [];
  // @ViewChild('canvasElement', { static: true })
  // canvasRef!: ElementRef<HTMLCanvasElement>;
  // title = 'xmind';
  // serviceData: any;
  constructor(private xmindService: XmindService) {}

  ngOnInit(): void {
    this.xmindService.createNewFile();
    const children = this.xmindService.getOrganizedTopics();
    this.nodes = children.map(child => ({
      id: child.id,
      label: child.title,
      color: 'lightblue',
      dimension: { width: child.width, height: child.height },
      position: { x: child.position.x, y: child.position.y },
    }));
    console.log(this.nodes);


    //links tới các child
    children.forEach(parent => {
      parent.children.forEach(child => {
        this.links.push({
          source: parent.id,
          target: child.id,
        });
      });
    });

  }
}
