<template>
  <div class="header-view">
    <el-row :gutter="0" justify="center">
      <el-col :span="12" :xs="24">
        <el-form ref="form" @submit.prevent>
          <el-form-item>
            <el-input
              v-model="data.form.text"
              placeholder="Please enter the content you want to search for"
              @keyup.enter="handleSearch"
            >
              <template #append>
                <el-button
                  @click="handleSearch"
                  :icon="data.Search"
                /> </template
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="data.form.check">
              <el-checkbox label="Sort by time" :value="1" />
              <el-checkbox label="Sort by rating" :value="2" />
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
  <div class="content-view">
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="8"
        :md="6"
        v-for="(item, index) in data.listCard"
        :key="index"
      >
        <el-card :body-style="{ padding: '0px' }" class="card-view">
          <div class="card-content">
            <div class="card-header">
              <img :src="slack_logo_mark" class="card-image" />
              <div>
                <div style="margin: 10px">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="item.name"
                    placement="top-start"
                  >
                    <span class="text-overfow">{{ item.name }}</span>
                  </el-tooltip>
                </div>
                <div style="margin: 10px">
                  <el-rate
                    v-model="item.star"
                    size="small"
                    allow-half
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="card-des">
              <div class="des-view">{{ item.des }}</div>
            </div>
            <div>
              <el-tag
                v-for="(item2, index2) in item.tag"
                :key="index2"
                size="small"
                type="success"
                class="ml-2"
                >{{ item2 }}</el-tag
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import slack_logo_mark from "@/assets/svg/slack_logo_mark.svg";
export default {
  setup() {
    const data = reactive({
      Search,
      form: {
        text: "",
        check: [],
      },
      listCard: [
        {
          name: "Plugin Name",
          des: "It is a program written according to a certain standard application program interface. It can only run on the system platform specified by the program (which may support multiple platforms at the same time), and cannot run separately from the specified platform. Because the plugin needs to call the function library or data provided by the original pure system. Many software have plugins, and there are countless types of plugins. For example, in IE, after installing relevant plugins",
          star: 2.6,
          tag: ["Good", "Easy to use"],
        },
        {
          name: "Plugin Name",
          des: "Introduction to plugins",
          star: 2,
          tag: ["Good", "Easy to use"],
        },
        {
          name: "Plugin Name",
          des: "Introduction to plugins",
          star: 2,
          tag: ["Good", "Easy to use"],
        },
        {
          name: "Plugin NamePlugin NamePlugin NamePlugin Name",
          des: "Introduction to plugins",
          star: 2,
          tag: ["Good", "Easy to use"],
        },
        {
          name: "Plugin Name",
          des: "Introduction to plugins",
          star: 2,
          tag: ["Good", "Easy to use"],
        },
        {
          name: "Plugin Name",
          des: "Introduction to plugins",
          star: 2,
          tag: ["Good", "Easy to use"],
        },
        {
          name: "Plugin Name",
          des: "Introduction to plugins",
          star: 2,
          tag: ["Good", "Easy to use"],
        },
      ],
    });
    const handleSearch = () => {
      ElMessage({
        showClose: true,
        message: "Searching",
        type: "warning",
      });
    };
    return {
      data,
      slack_logo_mark,
      handleSearch,
    };
  },
};
</script>
<style scoped lang="scss">
.header-view {
  padding: 50px 20px 0;
}

.content-view {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.card-view {
  margin-bottom: 20px;
  padding: 10px 20px;
  height: 200px;

  .card-content > div {
    padding-bottom: 10px;

    &:last-child {
      padding-bottom: 0;
    }
  }

  .card-header {
    display: flex;

    .card-image {
      width: 50px;
      margin-right: 5px;
    }
  }

  .card-des {
    color: #888888;
    font-size: 14px;
    .des-view{
      max-height: 80px;
      overflow: auto;
    }
  }

  .ml-2 {
    margin: 0 5px 5px 0px;
  }
}
</style>