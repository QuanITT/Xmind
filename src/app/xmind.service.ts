import { Injectable, inject } from '@angular/core';
import { baseTopic } from 'src/Xmind/baseTopic';
import { rootTopic } from 'src/Xmind/rootTopic';
import { DrawService } from './draw.service';
import { isNgTemplate } from '@angular/compiler';
import { position } from 'src/Xmind/position';
import { topic } from 'src/Xmind/topic';

@Injectable({
  providedIn: 'root',
})

export class XmindService {
  createNewTopic(): void {
    const topic1 = new baseTopic('topic');

    this.rootTopic.children.push(topic1);
  }

  private rootTopic!: rootTopic;

  constructor() {
  }

  public createNewFile(): void {
    this.rootTopic = new rootTopic('root');
    const topic1 = new baseTopic('topic1');
    const topic2 = new baseTopic('topic2');
    const topic3= new baseTopic('topic3');
    const topic4 = new baseTopic('topic4');
    const topic5 = new baseTopic('topic5');
    this.rootTopic.createTopic(topic1);
    this.rootTopic.createTopic(topic2);
    this.rootTopic.createTopic(topic3);
    this.rootTopic.createTopic(topic4);
    this.rootTopic.createTopic(topic5);


    const subtopic1 = new baseTopic('subtopic1');
    const subtopic2 = new baseTopic('subtopic2');
    const subtopic0 = new baseTopic('subtopic3');

    const subtopic3 = new baseTopic('subtopic1');
    const subtopic4 = new baseTopic('subtopic2');

    topic1.createTopic(subtopic1);
    topic1.createTopic(subtopic2);
    topic1.createTopic(subtopic0);

    topic2.createTopic(subtopic3);
    topic2.createTopic(subtopic4);


  }

  public OpenFile(filename: string): rootTopic {
    // this.rootTopic = new openTopic(filename).GetRootTopic();
    return this.rootTopic;
  }

  public SetRootTopic(root: rootTopic): rootTopic {
    this.rootTopic = root;
    return this.rootTopic;
  }

  public DisplayXmindFile(): void {
    this.ProcessRootTopic(this.rootTopic);
  }

  ProcessRootTopic(root: rootTopic) {
    //Reorganize all the topics
    this.ReorganizeTopic(root);
  }

  ReorganizeTopic(topic: baseTopic | rootTopic): baseTopic | rootTopic {
    const defaultWidth = this.getDefaultWidth();
    const defaultHeight = this.getDefaultHeight();
    const defaultSpace = this.getDefaultSpace();
    let currentPosition = new position(0, 0);
    topic.setWidth(defaultWidth);
    topic.setHeight(defaultHeight);
    topic.SetPosition(currentPosition);
    let counter : number = 0;

    topic.getChildren().forEach(item => {
      // all children topics should have same X position, different Y position [time] * (increase by height + space)
      const childPointX = defaultWidth + defaultSpace;
      const childPointY = (defaultHeight + defaultSpace) * counter++;
      currentPosition = new position(childPointX, childPointY);
      item.SetPosition(currentPosition);
      item.setWidth(defaultWidth);
      item.setHeight(defaultHeight);
     });

     return topic;
  }

  getDefaultSpace() {
    return 5;
  }
  getDefaultHeight() {
    return 10;
  }
  getDefaultWidth() {
    return 15;
  }
  getChildren(): baseTopic[] {

    return this.rootTopic.children;
  }
  getOrganizedTopics(): baseTopic[] {
    this.ReorganizeTopic(this.rootTopic);
    return  [this.rootTopic, ...this.rootTopic.children];
  }
  getChildrenProperties(): { title:string, x: number, y: number, width: number, height: number }[] {
    return this.rootTopic.children.map(child => ({
      title: child.title,
      x: child.position.x,
      y: child.position.y,
      width: child.width,
      height: child.height
    }));
  }


  // drawChildTopics(children: baseTopic[]) {
  //   if (children == null || children.length == 0) return;

  //   for (const childTopic of children) {
  //     this.drawTopic(childTopic);
  //   }
  // }

  // drawTopic(topic: baseTopic): void {
  //   if(this.drawService === null)
  //     return;

  //   this.drawService.drawRectangle(topic);

  // }

  // drawChildTopic(detachedchildren: baseTopic[]) {
  //   if (detachedchildren == null || detachedchildren.length == 0) return;

  //   for (const childTopic of detachedchildren) {
  //     this.drawTopic(childTopic);
  //   }
  // }
}
