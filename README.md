
## react-json-dom 模块
```
npm install react-json-dom --save
```
* react-json-dom  render  use json to the dom

## 使用

````
let init = {
    type: 'div',
    className: 'J_stage stage',
    children: [{
        type: 'Module',
        name: '',
        id: 1,
        children: [
            {
                type: 'div',
                onClick: 'goBack',
                src: 'sss',
                children: [{
                    type: 'text',
                    value: 'goBack'
                }]
            }, {
                type: 'Group',
                name: 'hell',
                id: 2,
                style: {
                    color: 'red'
                },
                children: [{
                    type: 'Text',
                    name: 'hell',
                    value: 'this is text',
                    id: 111,
                }]
            }, {
                type: 'span',
                className: 'hello',
                onClick: 'hello',
                id: 'hello',
                children: [{
                    type: 'text',
                    value: 'hello'
                }]
            }, {
                type: 'img',
                src: 'sss',
            }, {
                type: 'div',
                children: [{
                    type: 'text',
                    value: 'assaassa'
                }],
                onClick: 'up'
            }
        ]
    }]
};

//define compoents
const compoents = {
    Group
};
// listens fire
const listens = {
    goBack: function (goBack) {
        console.log('goBack',goBack)
    },
    changeInput: (res)=>{
        console.log('changeInput',res)

    },
    up: function () {
        
    }
    
};
ReactDOM.render(<Demo state = {init} compoents={compoents} listens = {listens}/>, document.getElementById('container'));

````


＊ 详细使用请看demo



