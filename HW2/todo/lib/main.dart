// Following the following tutorial https://daily-dev-tips.com/posts/build-a-todo-list-app-with-flutter/
// beginning with the ``flutter create`` command
// Use MUI UI components
import 'package:flutter/material.dart';

class Task {
  Task({required this.value, required this.completed});

  String value;
  bool completed;
}

void main() => runApp(new TodoApp());


// Here the app is stateless but the state is managed by the TodoList class
class TodoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
// Material app takes advantages of the MUI components
    return new MaterialApp(
      title: 'Todo list',
      home: new TodoList(),
    );
  }
}
// The state here handles adding/completing tasks
class TodoList extends StatefulWidget {
  @override
  _TodoListState createState() => new _TodoListState();
}

// This widget contains the tasks above
class TodoItem extends StatelessWidget {
  TodoItem({
    required this.task,
    required this.onTodoItemChanged,
  }) : super(key: ObjectKey(task));

  final Task task;
  final onTodoItemChanged;

  // Here we strike through completed tasks
  TextStyle? _getTextStyle(bool completed) {
    if (!completed) return null;

    return TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: () {
        onTodoItemChanged(task);
      },
      leading: CircleAvatar(
        // This makes little circle next to the task with the
        // first letter of the task in it
        child: Text(task.value[0]),
      ),
      title: Text(task.value, style: _getTextStyle(task.completed)),
    );
  }
}

class _TodoListState extends State<TodoList> {
  final TextEditingController _textFieldController = TextEditingController();

// The task class initialized above holds each individual task and its completed/not completed status
  final List<Task> _tasks = <Task>[];

// Dialog to add a task
  Future<void> _displayDialog() async {
    // All these settings are via the tutorial
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Add a new task'),
          content: TextField(
            controller: _textFieldController,
            decoration: const InputDecoration(hintText: 'Task'),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Add'),
              onPressed: () {
                Navigator.of(context).pop();
                _addTodoItem(_textFieldController.text);
              },
            ),
          ],
        );
      },
    );
  }

  void _handleTodoItemChange(Task task) {
    setState(() {
      task.completed = !task.completed;
    });
  }


  void _addTodoItem(String value) {
    // Adds the task to the list
    setState(() {
      _tasks.add(Task(value: value, completed: false));
    });
    // Clears the box
    _textFieldController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Todo List'),
      ),
      // This builds on the flutter ListView widget
      body: ListView(
        padding: EdgeInsets.symmetric(vertical: 8.0),
        children: _tasks.map((Task task) {
          // The TodoItem is the widget whereas the task is the basic
          // data structure
          return TodoItem(
            task: task,
            onTodoItemChanged: _handleTodoItemChange,
          );
        }).toList(),
      ),
      // This similarly builds on the floating action button widget
      floatingActionButton: FloatingActionButton(
          onPressed: () => _displayDialog(),
          tooltip: 'Add Task',
          // Uses the MUI icon widget
          child: Icon(Icons.add)),
    );
  }
}