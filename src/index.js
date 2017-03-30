// 解析json dom 单纯的渲染模式
import React, {Component} from 'react';
class Engine extends Component {
    static defaultProps = {
        state: {}, //{type: 'div',children: [{type: 'span',children:[]}]} json-dom
        props: {

        }, //定义添加组件共享数据或方法
        components: {}, //注册的组件
        listens: {}, //直接传人监听对象
        regPropsIgnore: null, //忽略数据中的哪些数据
        getItemProps: null,
    };
    /*   constructor(...props){
     super(...props);
     }*/
    get propsState (){
        return this.props.state || {}
    };
    listens = this.props.listens || {};
    fire(type,...props){
        const types = this.listens[type];
        if(types){
            if(this.isFunction(types)){
                types.apply(this,props)
            }else if(this.isArray(types)){
                types.forEach((item)=>{
                    if(item && this.isFunction(item)){
                        item.apply(this,props)
                    }
                })
            }
        }else{
            console.log(`fire: ${type} not found,please add Engine listens`)
        }
    }
    extend(target = {}, target2 = {}) {
        for (const i in target2) {
            target[i] = target2[i]
        }
        return target;
    }
    isFunction(fn){
        return typeof fn === 'function';
    }

    isArray(obj){
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    render() {
        this.share = this.extend({fire: this.props.fire || this.fire.bind(this)},this.props.props);
        return this.renderItem(this.propsState);
    }
    getItemProps (obj = {},isCom){
        if(this.props.getItemProps) return this.props.getItemProps(obj,isCom);
        let props = {};
        const share  = this.share || {};
        for(var key in obj){
            if(key && key !== 'type' && key !== 'children'){
                const type = obj[key];
                if(type && /^on[A-Z]/g.test(key)){
                    //使用fire模式
                    if(typeof type === 'string'){
                        props[key] = (...env)=>{
                            share.fire && share.fire(type,...env);
                        }
                    }else{
                        props[key] = type;
                    }
                }else if(!this.props.regPropsIgnore || !this.props.regPropsIgnore.test(key)){
                    props[key] = obj[key]
                }
            }
        }
        return props
    }
    get components(){
        return this.props.components || {}
    }
    renderItem(obj = {}) {
        let args = [];
        const type = obj.type;
        if(type){
            const typeItem = this.components[type];
            let props = this.getItemProps(obj,typeItem);
            if(typeItem){
                let share = this.extend({},this.share);
                args.push(typeItem, this.extend({state: obj},this.extend(share,props)));
                //nodeText
            }else if(type === 'text'){
                return obj.value;
            }else if(/^[a-z]+$/g) {
                args.push(type, props);
            }else{
                console.log(`type: ${obj.type} not found, please add Engine components`,obj);
                return null;
            }
            if (this.isArray(obj.children)) {
                obj.children.forEach((item)=> {
                    const itemRender = this.renderItem(item);
                    (itemRender !== null) && args.push(itemRender);
                })
            }else if(['string', 'number', 'boolean'].indexOf(typeof obj.children) !== -1){
                args.push(obj.children);
            }
            return React.createElement.apply(React, args);
        }else{
            console.log('type not exist',obj);
            return null
        }
    }
}
export default Engine;
