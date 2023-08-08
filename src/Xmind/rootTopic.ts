import { ListManipulator } from "./ListManipulator";
import { baseTopic } from "./baseTopic";
import { subtopic } from "./subtopic";

export class rootTopic extends baseTopic {


  private detachedChildren: baseTopic[] = [];

  getDetachedChildren() {
    return this.detachedChildren;
  }

  createDetachedTopic(topic: baseTopic) {
    this.detachedChildren.push(topic);
  }

  deleteDetachedTopic(topic: baseTopic) {
    const listManipulator = new ListManipulator(this.getDetachedChildren());
    this.detachedChildren = listManipulator.removeItem(topic);
  }

  convertToDetachedTopic(topic: baseTopic) {
    this.createDetachedTopic(topic);
    this.deleteTopic(topic);
  }


}
