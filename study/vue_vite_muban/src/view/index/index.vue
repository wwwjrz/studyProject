/<template>
  <div id="tableapp">
    <div class="container">
      <el-input
        v-model="specification"
        placeholder="请输入规格名称(例如：颜色)"
        style="width: 300px"
        @keyup.enter.native="addSpecification"
      ></el-input>
      <el-button type="primary" @click="addSpecification">添加规格</el-button>
      <div v-for="(item, index) in specificationList" :key="index">
        <h4>
          {{ item.title }}
          <el-input
            v-model="item.value"
            size="small"
            placeholder="请输入规格值（例如：红色）"
            style="width: 200px"
            @keyup.enter.native="addSpecificationValue(index)"
          ></el-input>
          <el-button
            type="primary"
            size="small"
            @click="addSpecificationValue(index)"
            >添加值</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteSpecification(index)"
            icon="el-icon-delete"
            circle
          ></el-button>
        </h4>
        <div class="sku-wrap">
          <div v-for="(sku, count) in item.list" :key="sku.id">
            <el-input
              size="mini"
              v-model="sku.value"
              @keyup.enter.native="handleValueInputBlur(sku)"
              @blur="handleValueInputBlur(sku)"
              placeholder="请输入内容"
              style="width: 150px"
            ></el-input>
            <el-button
              style="margin-right: 20px"
              type="danger"
              size="mini"
              @click="deleteSpecificationValue(index, count)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </div>
        </div>
      </div>
      <table class="table" border="0" cellspacing="0">
        <thead>
          <tr>
            <th v-for="(th, index) in tableHeadData" :key="index">{{ th }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tr, index) in tableContentData" :key="index">
            <td v-for="(td, count) in tr" :key="count">
              <span v-if="td.type == 'sku'">{{ td.value }}</span>
              <el-switch
                v-else-if="td.type === '上架'"
                v-model="td.value"
              ></el-switch>
              <el-select
                v-else-if="td.type === '标签'"
                v-model="td.value"
                placeholder="请选择标签"
              >
                <el-option
                  v-for="item in ['标签A', '标签B']"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-input
                v-else
                v-model="td.value"
                style="width: 100px"
              ></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "auditLog",
  data () {
    return {
      specification: "", // 每次添加的规格
      specificationList: [], //规格列表
      tableHeadData: [], //表头
      tableContentData: [], //生成后表中的数据
      delectFlag: false //删除sku数据的标记
    };
  },
  methods: {
    // 规格值输入框失去焦点或者按回车会在表格中循环修改
    handleValueInputBlur (sku) {
      const { id, value } = sku;
      this.tableContentData.forEach(item => {
        item.forEach(v => {
          if (v.id === id) {
            v.value = value;
          }
        });
      });
    },
    // 表格中的其他td数据
    staticData () {
      return [
        {
          type: "库存",
          value: ""
        },
        {
          type: "价格",
          value: ""
        },
        {
          type: "重量",
          value: ""
        },
        {
          type: "描述",
          value: ""
        },
        {
          type: "标签",
          value: ""
        },
        {
          type: "上架",
          value: false
        }
      ];
    },
    // 添加规格
    addSpecification () {
      if (!this.specification) return this.$message.warning("请填写规格再添加");
      let staticSpecification = this.staticData().find(
        item => item.type === this.specification
      );
      if (staticSpecification !== undefined)
        return this.$message.warning(`规格不能为"${staticSpecification.type}"`);
      let repetition = this.specificationList.some(
        item => item.title === this.specification
      );
      if (repetition) return this.$message.warning("请勿添加重复的规格");
      this.specificationList.push({
        title: this.specification, //规格
        list: [], //规格值
        sort: this.specificationList.length, //用于后面生成数据时排序 也可以当作当前项的初始索引
        new: false, //用于判断是否有新添加规格 且这个规格添加规格值之后只有一个规格值才会等于true 用于后面表格列表添加一列数据
        value: "" // 输入框v-model绑定值
      });
      this.specification = "";
    },
    // 添加规格值
    addSpecificationValue (index) {
      if (!this.specificationList[index].value)
        return this.$message.warning("请填写规格值再添加");
      let repetition = this.specificationList[index].list.some(
        item => this.specificationList[index].value === item.value
      );
      if (repetition) return this.$message.warning("请勿添加重复的规格值");
      // 只有新添加了一个规格 且这个规格之前没有规格值(即下面push之后该规格只有一个规格值) new才会等于true
      // 用于后面表格列表添加一列数据
      // 必须tableContentData有长度才能为true 因为tableContentData没有数据的话 就不用添加一列 而是直接在tableContentData列表push一行数据就行了
      this.specificationList[index].new =
        !this.specificationList[index].list.length &&
          this.tableContentData.length
          ? true
          : false;
      this.specificationList[index].list.push({
        value: this.specificationList[index].value, //规格值
        id: Math.floor(new Date() / 1000) + Math.random().toFixed(8)
      });
      this.specificationList[index].value = "";
      this.generateData(index);
    },
    // 生成数据
    generateData (index) {
      if (!this.specificationList.length) return false;
      let flag = this.specificationList.some(item => item.list.length > 0);
      if (!flag) return false;
      this.generateTableHead();
      this.generateTableContent(index);
    },
    // 生成表头
    generateTableHead () {
      this.tableHeadData = [];
      this.specificationList.forEach(item => {
        if (item.list.length) {
          this.tableHeadData.push(item.title);
        }
      });
      this.tableHeadData.push(...this.staticData().map(item => item.type));
    },
    // 处理表格中的数据
    generateTableContent (idx) {
      const tempTitle = this.specificationList[idx].title;
      let tempList = JSON.parse(JSON.stringify(this.specificationList)).filter(
        item => item.list.length
      ); //简单的深拷贝 不影响原数据 然后过滤掉没有规格值的规格
      const index = tempList.findIndex(item => item.title === tempTitle);
      /**
       * idx的是this.specificationList中当前添加值的规格项的索引
       * index是tempList中的索引 即this.specificationList筛选后对应的索引
       * */
      const newItem = tempList[index].list[tempList[index].list.length - 1]; //newItem为新添加的规格值项

      tempList[index].list = [newItem]; //使当前新添加的规格值的规格项中只有新添加的规格值 不然会出现重复数据

      const hasNewSpecificationItem = tempList.find(item => item.new);
      /*
       * 如果当前添加规格值的规格项是第一次添加值 那么它的new为true
       * hasNewSpecificationItem就为当前的那一项
       * 此时表格中的每行都需要添加一列新的规格数据 而不需要重新组合生成数据
       *  */
      if (hasNewSpecificationItem !== undefined) {
        for (let i = 0; i < this.tableContentData.length; i++) {
          //如果idx和index不等，证明出现没有值的规格 所以需要用筛选后的索引在表格中插入数据
          const spliceIndex =
            idx === index ? hasNewSpecificationItem.sort : index;

          // 表格中的每行都插入一列新的规格数据
          this.tableContentData[i].splice(spliceIndex, 0, {
            type: "sku",
            value: hasNewSpecificationItem.list[0].value,
            sort: hasNewSpecificationItem.sort,
            key: hasNewSpecificationItem.title,
            id: hasNewSpecificationItem.list[0].id
          });
        }
        // 插入完数据后 使new标记为false
        this.specificationList.forEach(item => (item.new = false));
      } else {
        // 这里改一下数据的结构
        const arr = tempList.map(item => {
          return item.list.map(item2 => {
            return {
              type: "sku",
              value: item2.value,
              sort: item.sort,
              key: item.title,
              id: item2.id
            };
          });
        });
        // 数据改造成真正的表中数据的结构
        const tableContentData = this.cartesianProductOf(...arr);
        tableContentData.forEach(item => {
          // 这里给表中每行加一些静态数据，如输入框 下拉框等
          item.push(...this.staticData());
        });
        // 数据加入表格中
        this.tableContentData.push(...tableContentData);
      }
    },
    // 删除规格
    deleteSpecification (index) {
      const title = this.specificationList[index].title;
      const tempList = JSON.parse(JSON.stringify(this.specificationList)); //删之前先保存一份用于后面判断
      this.specificationList.splice(index, 1);
      //删除完让sort重新获取值  不然后面添加规格排序会乱
      this.specificationList.forEach((item, index) => {
        item.sort = index;
      });
      if (!this.tableContentData.length) return false;
      // 如果当前删除的规格里面没有值就不用在this.tableContentData中删除数据
      if (!tempList[index].list.length) return false;
      // 如果删除的是最后一个规格，则清空所有数据
      if (this.tableContentData[0][1].type != "sku") {
        this.tableContentData = [];
        this.tableHeadData = [];
        return false;
      }
      // 删除表中整列的数据
      this.deleteRowData(title);
      // 因为删除完一列数据的话 可能会有多行重复的数据 所以需要去重
      for (let i = 0; i < this.tableContentData.length; i++) {
        for (let j = i + 1; j < this.tableContentData.length; j++) {
          this.recursionJudgeValue(i, j, 0, true);
          if (this.delectFlag) {
            this.tableContentData.splice(j, 1);
            j--;
          }
        }
      }
      // 重新生成表头
      this.generateTableHead();
    },
    // 删除规格值
    deleteSpecificationValue (index, index2) {
      if (!this.tableContentData.length)
        return this.specificationList[index].list.splice(index2, 1);
      const length = this.specificationList[index].list.length;
      const id = this.specificationList[index].list[index2].id;
      const title = this.specificationList[index].title;
      this.specificationList[index].list.splice(index2, 1);
      if (length > 1) {
        // 如果有多个值时就删除this.tableContentData中所有带有这个值的那一行
        content: for (let i = 0; i < this.tableContentData.length; i++) {
          value: for (let j = 0; j < this.tableContentData[i].length; j++) {
            if (this.tableContentData[i][j].id == id) {
              this.tableContentData.splice(i, 1);
              i--;
              break value;
            }
          }
        }
      } else {
        // 如果只有一个值 那么就把值从所有数据中删除 就是删除列
        this.specificationList[index].new = true; //删除掉这个值 那么这个规格没有值了  就等同于是新添加的
        this.deleteRowData(title);
        if (
          this.tableContentData.length === 1 &&
          this.tableContentData[0][0].type != "sku"
        ) {
          // 如果删除的是最后的规格和最后一个值就清空所有数据
          this.tableContentData = [];
          this.tableHeadData = [];
          // 如果没有数据就没有新值的概念
          this.specificationList.forEach(item => {
            item.new = false;
          });
          return false;
        }
        // 重新生成表头
        this.generateTableHead();
      }
    },
    // 删除表中一列的数据
    deleteRowData (title) {
      for (let i = 0; i < this.tableContentData.length; i++) {
        value: for (let j = 0; j < this.tableContentData[i].length; j++) {
          if (this.tableContentData[i][j].key == title) {
            this.tableContentData[i].splice(j, 1);
            break value;
          }
        }
      }
    },
    // 递归判断两行的数据是否一样
    recursionJudgeValue (i, j, count, flag) {
      let tempFlag =
        this.tableContentData[i][count].value ==
        this.tableContentData[j][count].value;
      let tempCount = count;
      const newFlag = flag && tempFlag;
      if (tempCount < this.specificationList.length) {
        tempCount++;
        this.recursionJudgeValue(i, j, tempCount, newFlag);
      } else {
        this.delectFlag = newFlag;
      }
    },
    // 笛卡尔积
    cartesianProductOf () {
      return Array.prototype.reduce.call(
        arguments,
        function (a, b) {
          var ret = [];
          a.forEach(function (a) {
            b.forEach(function (b) {
              ret.push(a.concat(b));
              // ret.push([...a, ...b]);
            });
          });
          return ret;
        },
        [[]]
      );
    }
  }
};
</script>

<style>
.container {
  padding-top: 20px;
  text-align: center;
}

.sku-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.table {
  margin: 30px auto;
  border-top: 1px solid #bbb;
  border-left: 1px solid #bbb;
}

.table td,
.table th {
  padding: 4px 8px;
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
}
</style>