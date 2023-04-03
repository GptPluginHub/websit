<template>
  <div class="header-view">
    <el-row :gutter="0" justify="center">
      <el-col :span="12" :xs="24">
        <el-form ref="form" @submit.prevent>
          <el-form-item>
            <el-input v-model="data.form.text" placeholder="请输入你要搜索的内容" @keyup.enter="handleSearch">
              <template #append> <el-button @click="handleSearch" :icon="data.Search" /> </template></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="data.form.check">
              <el-checkbox label="按时间排序" />
              <el-checkbox label="按评分排序" />
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
  <div class="content-view">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="6" :md="4" v-for="(item, index) in data.listCard" :key="index">
        <el-card :body-style="{ padding: '0px' }" class="card-view">
          <img :src="image" class="card-image" />
          <div style="margin: 10px">
            <span>{{ item.name }}</span>
          </div>
          <div style="margin: 10px">
            <span class="card-des">{{ item.des }}</span>
          </div>
          <div style="margin: 0 10px">
            <el-rate v-model="item.star" size="small" allow-half disabled />
          </div>
          <div style="margin: 10px">
            <el-tag v-for="(item2, index2) in item.tag" :key="index2" size="small" type="success" class="ml-2">{{ item2
            }}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive } from "vue";
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import image from "../../assets/image/0.webp"
export default {
  setup() {
    const data = reactive({
      Search,
      form: {
        text: '',
        check: []
      },
      listCard: [
        {
          name: "插件名称",
          des: "插件介绍",
          star: 2.6,
          tag: ["好", "用"],
        },
        {
          name: "插件名称",
          des: "插件介绍",
          star: 2,
          tag: ["好", "用"],
        },
        {
          name: "插件名称",
          des: "插件介绍",
          star: 2,
          tag: ["好", "用"],
        },
        {
          name: "插件名称",
          des: "插件介绍",
          star: 2,
          tag: ["好", "用"],
        },
        {
          name: "插件名称",
          des: "插件介绍",
          star: 2,
          tag: ["好", "用"],
        },
        {
          name: "插件名称",
          des: "插件介绍",
          star: 2,
          tag: ["好", "用"],
        },
        {
          name: "插件名称",
          des: "插件介绍",
          star: 2,
          tag: ["好", "用"],
        },
      ],
    });
    const handleSearch = () => {
      ElMessage({
        showClose: true,
        message: '搜索中',
        type: 'warning',
      })
    };
    return {
      data,
      image,
      handleSearch,
    };
  },
};
</script>
<style scoped lang="scss">
.header-view {
  margin-top: 50px;
  padding: 0 20px;
}

.content-view {
  padding: 20px;
}

.card-view {
  margin-bottom: 20px;

  .card-image {
    width: 100%;
  }

  .card-des {
    color: #888888;
    font-size: 14px;
  }

  .ml-2 {
    margin: 0 5px 5px 0px;
  }
}
</style>