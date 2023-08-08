import { ElementRef, Injectable } from '@angular/core';
import { baseTopic } from 'src/Xmind/baseTopic';
import { rootTopic } from 'src/Xmind/rootTopic';

@Injectable({
  providedIn: 'root',
})

export class DrawService {
  root: rootTopic; ;

   drawRectangle(topic: baseTopic) {
  //   var ctx = canvas.getContext('2d');
  //   if (ctx==null) return;
  //   ctx.strokeStyle = 'black';
  //   ctx.lineWidth = 1;
  //   ctx.strokeRect(
  //     this.topic.position.x,
  //     this.topic.position.y,
  //     this.topic.width,
  //     this.topic.height

   }

  constructor(root: rootTopic) {
    this.root = root;
  }

  ProcessRootTopic() {
    //Draw the topic node
    this.drawTopic(this.root);
    //Draw the child topics
    this.drawChildTopics(this.root.getChildren());
    //Draw the deteched children
    this.drawChildTopic(this.root.getDetachedChildren());
  }


  drawChildTopics(children: baseTopic[]) {
    if (children == null || children.length == 0) return;

    for (const childTopic of children) {
      this.drawTopic(childTopic);
    }
  }

  drawTopic(topic: baseTopic): void {
    this.drawRectangle(topic);
  }

  drawChildTopic(detachedchildren: baseTopic[]) {
    if (detachedchildren == null || detachedchildren.length == 0) return;

    for (const childTopic of detachedchildren) {
      this.drawTopic(childTopic);
    }
  }
}
