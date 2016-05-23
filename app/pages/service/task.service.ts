import {TaskList} from './task-list';
import {Task} from './Task';
import {Injectable} from '@angular/core';


@Injectable()
export class TaskService{

    getTasks():Task[]{
        return TaskList;
    }


}
