const div = dom.create("<div>111. 我是插入的div</div>");
dom.after(test,div);

const div2 = dom.create("<div>333. 我是插入的儿子</div>");
dom.append(test, div2);

const div3 = dom.create('<div id="parent">222. 我是插入的爸爸</div>');
dom.wrap(test, div3);

// const nodes = dom.empty(document.querySelector('#empty'));
// console.log(nodes);

const nodes = dom.empty2(window.empty);
console.log(nodes);

dom.attr(test, 'title', 'joyce')
const title = dom.attr(test, 'title')
console.log(`title: ${title}`);

dom.text(test, '你好，这里是新内容');

dom.style(test, 'border', 'red'); // arguments.length === 3
dom.style(test, 'border');  // arguments.length === 2  && typeof name === string
dom.style(test, {border: '1px solid green', color: 'green'});  // arguments.length === 2  && name instanceof Object

dom.class.add(test, 'ccc')
dom.class.remove(test, 'ddd')
console.log(dom.class.has(test, 'ddd'))


const fn = () => {
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const divList = dom.find('#test')[0]
console.log(divList);


const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'pink'))

console.log(dom.index(t1))

