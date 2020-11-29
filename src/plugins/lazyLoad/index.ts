/**
 * @el 绑定元素节点
 * @binding v-bind的值
 */
export default {
    mounted(el: Element, binding: any): void {
        const io = new IntersectionObserver((entriens: any[]) => {
            entriens.forEach((entry: any) => {
                const lazyImage = entry.target;
                if (entry.intersectionRatio > 0) {
                    lazyImage.src = binding.value;
                    io.unobserve(lazyImage);
                }
            });
        })

        io.observe(el)
    }
}