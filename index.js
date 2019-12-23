class Pagination {
  constructor (total = 1, pageSize = 7, currentPage = 1) {
    this.total = total
    this.pageSize = pageSize
    this.currentPage = currentPage
  }

  getPageList () {
    if (this.total <= 0) {
      throw new Error('total必须大于等于 1')
    }
    if (this.total < this.pageSize) {
      throw new Error('total不能小于currentPage')
    }
    if (this.total === 1) {
      return [1]
    }
    const pageList = Array
      .from({ length: this.total }, (v, i) => i + 1)
      .filter(value => {
        if (value === 1 || value === this.total) {
          return true
        }
        if (Math.abs(value - this.currentPage) <= 2) {
          return true
        }
        return false
      })
      .reduce((prev, current) => {
        if (Math.abs(current - prev[prev.length - 1]) > 1) {
          return prev.concat([-1, current])
        }
        return prev.concat([current])
      }, [])
  }
}

const a = new Pagination(10, 7, 5)

a.setPageList()