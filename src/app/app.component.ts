import {
  Component,
  OnInit,
} from '@angular/core';
import { XmindService } from './xmind.service';
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

  constructor(private xmindService: XmindService) {}

  ngOnInit(): void {
    this.getOpenFileXmind();
    this.CreateNew();

  }
  getOpenFileXmind(): void {
    this.xmindService.createNewFile();
    const children = this.xmindService.getOrganizedTopics();
    console.log(children);
    this.nodes = [
      {
        id: children[0].id,
        label: children[0].title,
        color: 'orange',
        dimension: { width: children[0].width, height: children[0].height },
        position: { x: children[0].position.x, y: children[0].position.y },
      },
    ];
    children.forEach((parent) => {
      parent.children.forEach((child) => {
        this.nodes.push({
          id: child.id,
          label: child.title,
          color: 'lightblue',
          dimension: { width: child.width, height: child.height },
          position: { x: child.position.x, y: child.position.y },
        });

        // Create links between parent and child
        this.links.push({ source: parent.id, target: child.id });
      });
    });

    console.log(this.nodes);

  }

  CreateNew():void {
    // btn click adds event create new topics
    // title ++ name , ex: Topics 1, topics 2, topics 3

    // change double click create new detached on topics
    // title ++ name, ex: Topics 1, topics 2, topics 3


    const newTopic = new baseTopic('New Topic');
    this.nodes.push({
      id: newTopic.id,
      label: newTopic.title,
      color: 'purple',
      dimension: { width: newTopic.width, height: newTopic.height },
      position: { x: newTopic.position.x, y: newTopic.position.y },
    });
    this.xmindService.createNewFile();
  }
}
