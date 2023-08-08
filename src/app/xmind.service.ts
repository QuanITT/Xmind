import { Injectable, inject } from '@angular/core';
import { baseTopic } from 'src/Xmind/baseTopic';
import { rootTopic } from 'src/Xmind/rootTopic';
import { DrawService } from './draw.service';
import { isNgTemplate } from '@angular/compiler';
import { position } from 'src/Xmind/position';

@Injectable({
  providedIn: 'root',
})

export class XmindService {

  private drawService!: DrawService;
  private rootTopic!: rootTopic;

  constructor() {
  }

  public createNewFile(): void {
    this.rootTopic = new rootTopic('root');
    this.rootTopic.createTopic(new baseTopic('topic1'));
    this.rootTopic.createTopic(new baseTopic('topic2'));
    this.rootTopic.createTopic(new baseTopic('topic3'));
    this.rootTopic.createTopic(new baseTopic('topic4'));
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
    debugger
    const defaultWidth = this.getDefaultWidth();
    const defaultHeight = this.getDefaultHeight();
    const defaultSpace = this.getDefaultSpace();

    topic.setWidth(defaultWidth);
    topic.setHeight(defaultHeight);
    let currentPosition = new position(0, 0);
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
    return 50;
  }
  getDefaultHeight() {
    return 100;
  }
  getDefaultWidth() {
    return 150;
  }
  getChildren(): baseTopic[] {
    return this.rootTopic.children;
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
