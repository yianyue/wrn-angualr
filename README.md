# Write Right Now!

Distraction-free, minimalisted writing app that motivates you to meet your writing goal.

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Issues

###Stack Overflow issue

####Problem: 

Running 'grunt serve' results in 'RangeError: Maximum call stack size exceeded'

####Fix:

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

####Explaination:

The fix appends the line `fs.inotify.max_user_watches=524288` to the file `sysctl.conf`.

The linux os sets a soft limit on the number of files the watcher can watch, and grunt watch exceeded this limit.

