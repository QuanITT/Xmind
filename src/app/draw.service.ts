import { ElementRef, Injectable } from '@angular/core';
import { baseTopic } from 'src/Xmind/baseTopic';
import { rootTopic } from 'src/Xmind/rootTopic';

@Injectable({
  providedIn: 'root',
})

export class DrawService {
  root: rootTopic;

   drawRectangle(topic: baseTopic) {
    // this.ctx.strokeStyle = "black";
    // this.ctx.lineWidth = 1;
    // this.ctx.strokeRect(topic.position.x, topic.position.y, topic.width, topic.height);

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
