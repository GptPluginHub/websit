<template>
  <header class="header-view">
    <!-- <img class="logo" :src="data.logo" alt="Plugin" srcset=""> -->
    <div></div>
    <el-icon size="32" color="#ffffff" @click="handleOpen('https://github.com/GptPluginHub/websit')">
      <Github />
    </el-icon>
  </header>
  <div class="title-view">
    <el-row justify="center">
      <el-col :span="3" :xs="24" justify="center">
        <div style="display: flex; align-items: center;justify-content: center;height: 100%;">
          <img style="height: 100px;" class="logo" :src="data.logo" alt="Plugin" srcset="">
        </div>
      </el-col>
      <el-col :span="10" :xs="24">
        <div style="text-align: center;margin-bottom: 40px;">
          <h1 style="font-size: 45px;">Add Plugin</h1>
          <div style="color: #324A6D;line-height: 1.5;margin-top: 20px;">Welcome to GPH (ChatGPT Plugin Hub), the ultimate
            marketplace for ChatGPT plugins! Share your plugin usage experiences and rate them to help others. Discover
            amazing plugins and enhance your ChatGPT experience today!</div>
        </div>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="12" :xs="24">
        <el-form @submit.prevent>
          <el-form-item>
            <el-input size="large" v-model="data.formData.fuzzyName" clearable @clear="handleSearch"
              placeholder="Please enter the content you want to search for" @keyup.enter="handleSearch">
              <template #append>
                <el-button @click="handleSearch" :icon="Search" />
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>

  <div class="content-view">
    <el-row style="margin-bottom: 10px;">
      <el-col :span="12">
        <el-select v-model="data.formData.sortByFieldName" @change="handleCheckboxChange">
          <el-option v-for="item in data.sortBy" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button>Add Plugin</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-loading="data.loading">
      <el-col :xs="24" :sm="8" :md="6" v-for="(item, index) in data.listCard" :key="index">
        <el-card :body-style="{ padding: '0px' }" class="card-view" @click="handleCardClick(item)">
          <div class="card-content">
            <div class="card-header">
              <img :src="item.logoUrl" class="card-image" />
              <div style="flex: 1">
                <div style="margin: 10px">
                  <el-tooltip class="box-item" effect="dark" :content="item.name" placement="top-start">
                    <span class="text-overfow">{{ item.name }}</span>
                  </el-tooltip>
                </div>
                <div style="margin: 0 10px">
                  <el-rate v-model="item.score" size="small" allow-half disabled />
                </div>
              </div>
              <div class="header-icon">
                <div class="icon-edit">
                  <el-icon @click.stop="handleTK(item)" color="#999999">
                    <Edit />
                  </el-icon>
                </div>
                <div class="icon-heat">
                  <el-icon color="999999">
                    <Heat />
                  </el-icon>
                  <span>{{ item.heat }}</span>
                </div>
              </div>
            </div>
            <div class="card-des">
              <div class="des-view">{{ item.description }}</div>
            </div>
            <div style="overflow-y: auto; white-space:nowrap">
              <el-tag v-for="(item2, index2) in item.labels" :key="index2" size="small" type="success" class="ml-2">{{
                item2 }}</el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col v-if="data.noData">
        <el-empty :image-size="200" />
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="data.page.total != 0">
      <el-col>
        <el-pagination v-model:current-page="data.formData.page" :page-size="data.formData.pageSize"
          layout="total, prev, pager, next" :total="data.page.total" @current-change="handleCurrentChange" />
      </el-col>
    </el-row>
  </div>
  <el-drawer size="50%" v-model="data.drawerData.visibleDrawer" direction="rtl" @closed="handleDrawerClosed">
    <template #header>
      <h4>{{ data.drawerData.title }}</h4>
    </template>
    <template #default>
      <div>
        <el-form :model="data.drawerData.formData" @submit.prevent label-width="100">
          <el-form-item label="score:">
            <el-rate v-model="data.drawerData.formData.score" allow-half />
          </el-form-item>
          <el-form-item label="comments:">
            <el-input v-model="data.drawerData.formData.comments" placeholder="Please enter a comments" clearable>
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="label:">
            <el-input v-model="data.drawerData.formData.label" @keyup.enter="handleAddLabel"
              placeholder="Please enter a label" clearable>
              <template #append>
                <el-button @click="handleAddLabel" :icon="Plus" />
              </template>
            </el-input>
            <div style="padding-top: 5px">
              <el-tag size="small" v-for="(itemTag, indexTag) in data.drawerData.formData.labels" :key="indexTag"
                type="success" class="ml-2" closable @close="handleTagClose(indexTag)">{{ itemTag }}</el-tag>
            </div>
          </el-form-item> -->
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="handleCancelClick">cancel</el-button>
        <el-button type="primary" @click="handleConfirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script>
import { reactive, onMounted } from "vue";
import { Search, Edit, Plus } from "@element-plus/icons-vue";
import slack_logo_mark from "@/assets/svg/slack_logo_mark.svg";
import logo from "@/assets/logo.png";
import Heat from "@/assets/svg/heat.vue";
import Github from "@/assets/svg/github.vue";
import { v1alpha1Plugins, pluginScore } from "@/plugins/http.js";
export default {
  components: {
    Edit,
    Heat,
    Github
  },
  setup() {
    const data = reactive({
      logo,
      loading: false,
      lables: [],
      sortBy: [
        {
          value: 'score',
          label: 'Sort by rating'
        },
        {
          value: 'heat',
          label: 'Sort by heat'
        }
      ],
      formData: {
        fuzzyName: '',
        page: 1,
        pageSize: 12,
        orderBy: 'desc',
        sortByFieldName: 'heat' // 按字段名称排序
      },
      page: {
        total: 0
      },
      listCard: [],
      noData: false,
      drawerData: {
        visibleDrawer: false,
        title: '',
        formData: {
          pluginId: undefined,
          score: 0,
          comments: '',
          label: '',
          labels: []
        }
      }
    });
    onMounted(() => {
      getList()
    })
    const handleOpen = (url) => {
      window.open(url)
    }
    const handleCheckboxChange = () => {
      getList()
    }
    const getList = () => {
      data.loading = true
      v1alpha1Plugins({
        ...data.formData
      }).then(e => {
        data.loading = false
        e.item && (data.listCard = e.item)
        e.item.length === 0 ? (data.noData = true) : (data.noData = false)
        e.page && (data.page = e.page)
      }).catch(() => {
        data.loading = false
      })
    }
    const handleSearch = () => {
      data.formData.page = 1;
      getList()
    };
    const handleCurrentChange = (val) => {
      data.formData.page = val;
      getList()
    }
    const handleCardClick = (item) => {
      window.open(`https://a60.ronfu.top/api/hub.io/v1alpha1/openapi?openapi_url=${item.apiUrl}`)
    }
    const handleTK = (item) => {
      data.drawerData.title = item.name
      data.drawerData.formData.pluginId = item.id
      data.drawerData.visibleDrawer = true
    }
    const handleTagClose = (index) => {
      data.drawerData.formData.labels.splice(index, 1)
    }
    const handleAddLabel = () => {
      let text = data.drawerData.formData.label.trim()
      if (text) {
        data.drawerData.formData.labels.push(text)
      }
      data.drawerData.formData.label = ''
    }
    const handleCancelClick = () => {
      data.drawerData.visibleDrawer = false
    }
    const handleConfirmClick = () => {
      addScore({
        "pluginId": data.drawerData.formData.pluginId,
        "score": data.drawerData.formData.score,
        "comments": data.drawerData.formData.comments,
      }).then(() => {
        handleCancelClick()
        getList()
      })
    }
    const handleDrawerClosed = () => {
      data.drawerData.formData = {
        pluginId: undefined,
        score: 0,
        comments: '',
        label: '',
        labels: []
      }
    }
    const addScore = (data) => {
      return pluginScore(data)
    }
    return {
      Search,
      data,
      slack_logo_mark,
      handleCheckboxChange,
      handleSearch,
      handleCurrentChange,
      handleCardClick,
      handleTK,
      handleConfirmClick,
      handleAddLabel,
      handleCancelClick,
      handleTagClose,
      handleDrawerClosed,
      handleOpen
    };
  },
};
</script>
<style scoped lang="scss">
.header-view {
  background-color: var(--header-bg);
  height: 60px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    height: 42px;
  }
}

.title-view {
  padding: 50px 20px 0;
}

.content-view {
  padding: 20px;
  max-width: 1200px;
  min-height: 400px;
  margin: auto;
}

.card-view {
  margin-bottom: 20px;
  padding: 10px 20px;
  cursor: pointer;

  .card-content {
    height: 200px;
    display: flex;
    flex-direction: column;

    &>div {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .card-header {
      display: flex;
      align-items: center;

      .header-icon {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .icon-edit {
          text-align: right;
        }

        .icon-heat {
          &>span {
            display: inline-block;
            padding-left: 2px;
            font-size: 15px;
            vertical-align: top;
          }
        }
      }

      .card-image {
        width: 50px;
        height: 50px;
        margin-right: 5px;
      }
    }

    .card-des {
      color: var(--light-colour);
      font-size: 14px;
      flex: 1;
      max-height: 80px;
      overflow: auto;
    }
  }
}

.ml-2 {
  margin: 0 5px 5px 0px;
}
</style>