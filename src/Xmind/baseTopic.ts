import { v4 as uuidv4 } from 'uuid';
import { ListManipulator } from './ListManipulator';
import { subtopic } from './subtopic';
import { Relationship } from './Relationship';
import { position } from './position';

export class baseTopic {


  id: string;
  title: string;
  position!: position;
  width!: number;
  height!: number;
  private children: baseTopic[] = [];
  private relationships: baseTopic[] = [];
  SetPosition(position: position) {
    //this.point = new position(this.point.x??0 + space, this.point.y??0 + space);
    this.position = position;
  }
  setWidth(width: number) {
    this.width = width;
  }
  setHeight(height: number) {
    this.height = height;
  }

  constructor(title: string) {
    this.id = this.createGuid().toString();
    this.title = title;
    this.position = new position();
  }
  deleteTopicIdSet(idSet: Array<string>) {
    const topics: baseTopic[] = [];
    idSet.forEach((item) => {
      const child = this.children.find((e) => e.id === item);
      if (child) topics.push(child);
      this.deleteTopics(topics);
    });
  }

  createTopic(topic: baseTopic) {
    this.children.push(topic);
  }

  deleteTopic(topic: baseTopic) {
    const listManipulator = new ListManipulator(this.getChildren());
    this.children = listManipulator.removeItem(topic);
  }

  deleteTopics(topics: baseTopic[]) {
    const listManipulator = new ListManipulator(this.getChildren());
    topics.forEach((element) => {
      this.children = listManipulator.removeItem(element);
    });
  }

  convertToAttachedTopic(subtpc: subtopic) {
    this.createTopic(subtpc);
    this.deleteTopic(subtpc);
  }

  public getChildren(): baseTopic[] {
    return this.children;
  }

  private createGuid(): string {
    return uuidv4().toString();
  }

  getRelationships(): baseTopic[] {
    return this.relationships;
  }

  createRelationship(subtopic1: subtopic) {
    this.relationships.push(subtopic1);
  }

  convertToTopic(toppic1: baseTopic) {
    this.createTopic(toppic1);
  }

  CreateControlPoint(controlPoint: baseTopic) {
    this.relationships.push(controlPoint);
  }

  CreateLineEndPoint(lineEndPoint: Relationship) {
    this.relationships.push(lineEndPoint);
  }
}
