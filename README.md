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

Running `grunt serve` results in 'RangeError: Maximum call stack size exceeded'

####Fix:

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

####Explanation:

The fix appends the line `fs.inotify.max_user_watches=524288` to the file `sysctl.conf`.

The linux os sets a soft limit on the number of files the watcher can watch, and grunt watch exceeded this limit.

###Heroku Does not Update

####Problem:

Changes made to the file appear on localhost, but pushing to heroku fails to make change

####Fix:
```
grunt build
git add -A
git commit -m "blah"
git push heroku master
```

####Explanation:

Heroku runs the web.js file, which serves the files from the dist folder, which does not automatically update to reflect the changes in the app folder. `grunt build` rebuild the dist files from the app files.

####To-do:

Figure out how to auto-run grunt build when deploying.
https://devcenter.heroku.com/articles/node-with-grunt#specify-your-grunt-task-in-a-postinstall-script

