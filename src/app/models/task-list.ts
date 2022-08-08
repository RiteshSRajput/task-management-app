export interface TaskList {
  id: string;
  name: string;
  tasks: Array<Task>;
}
export interface Task {
  name: string;
}
