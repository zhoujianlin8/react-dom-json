
## react-dom-json 模块
```
npm install react-dom-json --save
```
* react-dom-json  render  use json to the dom

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
                    children: 'goBack'
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
                    children: 'hello'
                }]
            }, {
                type: 'img',
                src: 'sss',
            }, {
                type: 'div',
                children: 'assaassa',
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



