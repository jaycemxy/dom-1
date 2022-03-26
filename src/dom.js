window.dom = {
    create(string) {  // 创建节点
        const container = document.createElement("template");
        container.innerHTML = string.trim();  // trim()去掉字符串左右两边的空格
        return container.content.firstChild;
    },
    after(node,node2) {  // 新增弟弟
        // console.log(node.nextSibling);
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node,node2) {  // 新增哥哥
        node.parentNode.insertBefore(node2,node);
    },
    append(parent,node) {  // 新增儿子
        parent.appendChild(node);
    },
    wrap(node,parent) {  // 新增爸爸
        dom.before(node, parent);
        dom.append(parent, node);
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        const {childNodes} = node  // 等价于 const childNodes = node.childNodes
        const array = []
        for (let i=0; i < childNodes.length-1; i++) {
            dom.remove(childNodes[i])
            array.push(childNodes[i])
        }
        return array
    },
    empty2(node) {
        const array = []
        let x = node.firstChild
        while(x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        } 
        return array
    },
    attr(node, name, value) {  // 重载
        if(arguments.length === 3){
            node.setAttribute(name, value)
        } else if(arguments.length === 2){
            return node.getAttribute(name)
        }
    },
    text(node,string) {   // 适配
        if(arguments.length === 2){
            if('innerText' in node) {
                node.innerText = string;  // IE浏览器
            } else {
                node.textContent = string;  // Chrome、firefox浏览器
            }
        } else if(arguments.length === 1) {
            if('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node,string) {
        if(arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if(arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        }else if(arguments.length === 2) {
            // dom.style(div, 'color')
            if(typeof name === 'string'){
                return node.style[name]
            } else if(name instanceof Object){
                // dom.style(div, {color: 'red'})
                const object = name
                for(let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has (node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector,scope) {  // scope指定查找范围，如果有第二个参数就在指定范围内查找
       return (scope || document).querySelectorAll(selector)
    },
    children(node) {
        return node.children
    },
    siblings(node) {  // 找到兄弟姐妹且要排除自己
        return Array.from(node.parentNode.children).filter(n=>n!==node);
    },
    next(node) {
        let x = node.nextSibling
        while(x && x.nodeType === 3) {  // 判断是否为文本节点
            x = x.nextSibling
        }
        return x
    },
    each(nodeList, fn) {
        for(let i=0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {  // 该节点排行老几
        const list = dom.children(node.parentNode)
        let i
        for(i=0; i<list.length; i++) {
            if(list[i] === node) {
                break
            }
        }
        return i
    },
}