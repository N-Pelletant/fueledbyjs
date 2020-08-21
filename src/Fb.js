import Root from './components/Root'

const holder = document.getElementById('app');

Root.parent = holder;

holder.appendChild(Root.render())