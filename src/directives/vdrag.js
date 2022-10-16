
export default function drag(el, bindings) {
        el.onmousedown = function (e) {
            var disx = e.pageX - el.offsetLeft
            var disy = e.pageY - el.offsetTop;
            document.onmousemove = function (e) {
                // e.target.style.cursor = 'move';
                el.style.left = e.pageX - disx + 'px'
                el.style.top = e.pageY - disy + 'px'
            }
            document.onmouseup = function () {
                // e.target.style.cursor = 'default';
                document.onmousemove = document.onmouseup = null
            }
        }
    }
