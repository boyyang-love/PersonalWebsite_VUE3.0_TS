
/**
 * @author yang
 * @time 2021/5/30
 * @description {瀑布流}
*/

class WaterfallFlow {
      el: HTMLElement
      column?: number | string
      screenW?: number
      imgWidth: number
      gap?: number
      arr: any[]
      min: number
      constructor(el: HTMLElement, column: string | number = 4, gap = 10) {
            this.el = el
            this.column = column
            this.gap = gap
            this.screenW = 0
            this.imgWidth = 0
            this.arr = []
            this.min = 0
            this.__init__()
      }

      __init__() {
            this.getScreenW(this.el)
      }


      // 获取屏幕的宽度
      getScreenW(el: HTMLElement): number {
            this.screenW = el.clientWidth
            this.getImgW(el.clientWidth, this.column, this.gap)

            return this.screenW
      }

      // 计算图片宽度
      getImgW(W: number, column: number | string, gap: number): number {
            const imgW = (W / (column as number)) - (column as number - 1) * gap
            this.imgWidth = imgW

            this.setImgW()
            return imgW
      }

      // 确定图片width
      setImgW() {
            const arr = []
            const w = this.imgWidth
            const imgbox: HTMLCollection = this.el.getElementsByClassName('img-box')
            const len: number = imgbox.length
            for (let i = 0; i < len; i++) {
                  (imgbox[i] as HTMLElement).style.width = w + 'px'
                  if (i < (this.column as number)) {
                        (imgbox[i] as HTMLElement).style.top = 0 + 'px'
                        arr.push(imgbox[i].clientHeight)
                        if ((i + 1) % ((this.column as number) + 1) == 1) {
                              (imgbox[i] as HTMLElement).style.left = 0 + 'px'
                        } else {
                              (imgbox[i] as HTMLElement).style.left = i * (w + this.gap) + 'px'
                        }
                  } else {
                        console.log(arr)
                        const min = this.getMinIndex(arr);
                        console.log(min);
                        (imgbox[i] as HTMLElement).style.left = (imgbox[min] as HTMLElement).clientLeft + 'px';
                        console.log((imgbox[i] as HTMLElement).style.left);
                        (imgbox[i] as HTMLElement).style.top = arr[min] + this.gap + 'px';
                        console.log((imgbox[i] as HTMLElement).style.top);
                        arr[min] += (imgbox[i] as HTMLElement).clientHeight
                        console.log(arr)
                  }
            }
      }

      // 获取最新图片下标
      getMinIndex(arr): number {
            return [].indexOf.call(arr, Math.min.apply(null, arr))
      }


}


export default WaterfallFlow