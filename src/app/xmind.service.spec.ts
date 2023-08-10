import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { rootTopic } from 'src/Xmind/rootTopic';
import { topic } from 'src/Xmind/topic';
import { subtopic } from 'src/Xmind/subtopic';
import { baseTopic } from 'src/Xmind/baseTopic';
import { Relationship } from 'src/Xmind/Relationship';
import { XmindService } from './xmind.service';

describe('Xmind Service', () => {  
  it('Should create new file', () => {
    const root = new rootTopic('RootTopic');
    root.createTopic(new topic('Child1'));
    root.createTopic(new topic('Child2'));
    root.createTopic(new topic('Child3'));
    root.createTopic(new topic('Child4'));

    expect(root.getChildren().length).toEqual(4);

    const firstTopic = root.getChildren()[0];

    expect(firstTopic.title).toEqual('Child1');
    //expect(app).toBeTruthy();
  });

  it('createSubtopic', () => {
    const { root, maintopic, subtpc } = CreateTopics();
    // handle new topics for all topics types ( rootTopic,topics,subtopic)
    CreateNewChildTopic(root, 'Main Topic 3');

    expect(root.getChildren().length).toEqual(2);

    CreateNewChildTopic(maintopic, 'Sub Topic 1');

    expect(maintopic.getChildren().length).toEqual(3);

    CreateNewChildTopic(subtpc, 'Sub Topic 1.1');

    expect(subtpc.getChildren().length).toEqual(1);
  });



  it('deleteTopic', () => {
    const root = new rootTopic('RootTopic');

    //if rootTopic is not able to delete
    root.deleteTopic(root);

    const main = new topic('MainTopic');
    root.createTopic(main);

    expect(root.getChildren().length).toEqual(1);

    //if delete mainTopic
    root.deleteTopic(main);
    expect(root.getChildren().length).toEqual(0);
  });

  it('deleteSubtopic', () => {
    const root = new rootTopic('RootTopic');
    //if rootTopic is not able to delete
    root.deleteTopic(root);

    const main = new topic('MainTopic');
    root.createTopic(main);

    const sub = new subtopic('SubTopic');
    sub.createTopic(new subtopic('subtopic1.1'));
    main.createTopic(sub);

    //if delete all topics in mainTopic
    main.deleteTopics(main.getChildren());
    expect(main.getChildren().length).toEqual(0);
  });

  it('detachedchildren', () => {
    const root = new rootTopic('RootTopic');
    const toppic1 = new topic('Floating Topic');
    //if rootTopic is not able to delete
    root.createDetachedTopic(toppic1);

    expect(root.getDetachedChildren().length).toEqual(1);

    toppic1.createTopic(new topic('Floating Topic'));

    expect(toppic1.getChildren().length).toEqual(1);

    root.convertToTopic(toppic1);
    root.deleteDetachedTopic(toppic1);

    expect(root.getDetachedChildren().length).toEqual(0);
    expect(root.getChildren().length).toEqual(1);
    //move out from root
  });
  //sua lai test case conver to
  it('topic to detached topics', () => {
    const root = new rootTopic('RootTopic');
    const maintopic = new topic('Maintopics');
    const subtpc = new subtopic('subtopic1');
    const idlist = new Array<string>();

    maintopic.createTopic(subtpc);
    subtpc.createTopic(new subtopic('subtopic2'));
    idlist.push(subtpc.id);
    root.createTopic(maintopic);

    expect(root.getChildren().length).toEqual(1);

    root.convertToDetachedTopic(maintopic);

    expect(root.getChildren().length).toEqual(0);
  });

  it('subtopic to detached maintopics', () => {
    const { root, maintopic } = initDetachedData();

    expect(root.getChildren().length).toEqual(1);

    root.convertToDetachedTopic(maintopic);

    expect(root.getChildren().length).toEqual(0);
  });

  it('subtopic to detached maintopics', () => {
    const { root, maintopic, subtpc } = initDetachedData();

    expect(root.getChildren().length).toEqual(1);

    root.convertToDetachedTopic(subtpc);
    // cant not remove subtopic because there is no subtopic
    expect(maintopic.getChildren().length).toEqual(1);
  });

  it('delete topics form id ', () => {
    const { root, maintopic, subtpc } = CreateTopics();

    subtpc.createTopic(new subtopic('subtopic 1.1'));

    maintopic.createTopic(subtpc);
    const idlist = new Array<string>();
    idlist.push(maintopic.id);
    root.deleteTopicIdSet(idlist);

    expect(root.getChildren().length).toEqual(0);
  });

  it('delete suptoppics from id ', () => {
    const { root, maintopic, subtpc } = CreateTopics();
    subtpc.createTopic(new subtopic('subtopic 1.1'));
    subtpc.createTopic(new subtopic('subtopic 1.2'));
    root.createTopic(new topic('Maintopics 1'));
    maintopic.createTopic(subtpc);

    const idlist = new Array<string>();
    idlist.push(subtpc.id,root.id);
    root.deleteTopicIdSet(idlist);

    expect(maintopic.getChildren().length).toEqual(3);
  });

  it('create relationship with root to subtopic', () => {
    const root = new rootTopic('RootTopic');
    const mainTopic = new topic('Maintopics');
    const subtopic1 = new subtopic('subtopic1');

    root.createTopic(mainTopic);
    mainTopic.createTopic(subtopic1);
    //handle create new relationship
    expect(root.getRelationships().length).toEqual(0);

    root.createRelationship(subtopic1);

    expect(root.getRelationships().length).toEqual(1);
  });

  it('create relationship maintopic with subtopic', () => {
    const root = new rootTopic('RootTopic');
    const mainTopic = new topic('Maintopics');
    const subtopic1 = new subtopic('subtopic1');

    root.createTopic(mainTopic);

    subtopic1.createTopic(mainTopic);
    //handle create new relationship
    expect(subtopic1.getRelationships().length).toEqual(0);

    subtopic1.createRelationship(mainTopic);

    expect(subtopic1.getRelationships().length).toEqual(1);
  });

  it('create relationship with detached', () => {
    const root = new rootTopic('RootTopic');
    const toppic1 = new topic('Floating Topic');
    const subtopic1 = new subtopic('subtopic1');
    //if rootTopic is not able to delete

    root.createDetachedTopic(toppic1);
    toppic1.createTopic(subtopic1);

    const toppic2 = new topic('Floating Topic');

    toppic1.createTopic(toppic2);
    subtopic1.createRelationship(toppic2);

    expect(subtopic1.getRelationships().length).toEqual(1);
  });

  it('move subtopic to ', () => {
    const { root, maintopic, subtpc } = CreateTopics();

    root.createTopic(maintopic);
    subtpc.createTopic(new subtopic('subtopic 1.1'));
    maintopic.createTopic(subtpc);

    expect(subtpc.getChildren().length).toEqual(1);
    expect(root.getChildren().length).toEqual(2);

    root.convertToAttachedTopic(subtpc);

    expect(maintopic.getChildren().length).toEqual(3);
  });

  it('move maintopic to subtopics', () => {
    const { root, maintopic, subtpc } = CreateTopics();

    root.createTopic(maintopic);
    subtpc.createTopic(new subtopic('subtopic 1.1'));
    maintopic.createTopic(subtpc);

    expect(root.getChildren().length).toEqual(2);
  });

  it('ControlPoint,LineEndPoint With Relationship', () => {
    const { root, maintopic, subtpc } = CreateTopics();

    root.createTopic(maintopic);
    subtpc.createTopic(new subtopic('subtopic 1.1'));
    maintopic.createTopic(subtpc);
    //handle create new relationship
    expect(root.getRelationships().length).toEqual(0);
    root.createRelationship(subtpc);
    createNewPoint(subtpc);

    expect(root.getRelationships().length).toEqual(1);
  });

  it('SetWidth to Topics', () => {
    const { root, maintopic, subtpc } = CreateTopics();

    root.createTopic(maintopic);
    subtpc.createTopic(new subtopic('subtopic 1.1'));
    maintopic.createTopic(subtpc);
    //handle set width to topips
  });

  it('Set default width and height for root topic', () => {
    const root = new rootTopic('RootTopic');
    const service = new XmindService();
    service.SetRootTopic(root);
    const result = service.ReorganizeTopic(root);

    expect(result.width).toEqual(150);
    expect(result.height).toEqual(100);
  });

  it('Set default width and height for children topic', () => {
    let root = new rootTopic('RootTopic');
    const mainTopic1 = new topic("main 1");
    const mainTopic2 = new topic("main 2");
    const mainTopic3 = new topic("main 3");
    const mainTopic4 = new topic("main 4");

    root.createTopic(mainTopic1);
    root.createTopic(mainTopic2);
    root.createTopic(mainTopic3);
    root.createTopic(mainTopic4);

    const service = new XmindService();

    service.SetRootTopic(root);
    service.ReorganizeTopic(root);

    expect(root.position.x).toEqual(0);
    expect(root.position.y).toEqual(0);
    expect(mainTopic1.position.x).toEqual(200);
    expect(mainTopic1.position.y).toEqual(0);

    expect(mainTopic2.position.x).toEqual(200);
    expect(mainTopic2.position.y).toEqual(150);

    expect(mainTopic3.position.x).toEqual(200);
    expect(mainTopic3.position.y).toEqual(300);

    expect(mainTopic4.position.x).toEqual(200);
    expect(mainTopic4.position.y).toEqual(450);
  });
});

function CreateNewChildTopic(baseTopic: baseTopic, title: string) {
  baseTopic.createTopic(new topic(title));
}

function CreateTopics() {
  const root = new rootTopic('RootTopic');
  const maintopic = new topic('Maintopics');
  const subtpc = new subtopic('subtopic1');
  maintopic.createTopic(subtpc);
  maintopic.createTopic(new subtopic('subtopic2'));
  root.createTopic(maintopic);
  return { root, maintopic, subtpc };
}

function initDetachedData() {
  const root = new rootTopic('RootTopic');
  const maintopic = new topic('Maintopics');
  const subtpc = new subtopic('subtopic1');

  maintopic.createTopic(subtpc);
  subtpc.createTopic(new subtopic('subtopic2'));

  root.createTopic(maintopic);
  return { root, maintopic, subtpc };
}

function createNewPoint(root: baseTopic) {
  const controlPoint = new Relationship('lineEndPoint');
  const lineEndPoint = new Relationship('lineEndPoint');
  root.CreateControlPoint(controlPoint);
  root.CreateLineEndPoint(lineEndPoint);
}
