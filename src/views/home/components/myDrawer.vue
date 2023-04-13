<template>
    <el-drawer v-bind="$attrs" direction="rtl" @closed="handleDrawerClosed">
        <template #header>
            <h4>Add Plugin</h4>
        </template>
        <template #default>
            <el-form ref="ruleFormRef" :model="formData" :rules="rules" @submit.prevent label-width="100">
                <el-form-item label="Domain:" prop="domain">
                    <el-input v-model="formData.domain" placeholder="Please enter a domain" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="Label:">
                    <el-input v-model="formData.label" placeholder="Please enter a label" clearable>
                    </el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="handleCancelClick">cancel</el-button>
                <el-button type="primary" @click="handleConfirmClick(ruleFormRef)">confirm</el-button>
            </div>
        </template>
    </el-drawer>
</template>
<script>
import { reactive, toRefs, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { v1alpha1Plugin } from '@/plugins/http.js'
export default {
    setup(props, cxt) {
        const ruleFormRef = ref(null)
        const data = reactive({
            addSuccess: false,
            formData: {
                "domain": "",
                "label": ""
            },
            rules: {
                domain: [
                    { required: true, message: 'Please enter a domain', trigger: 'blur' },
                ],
            }
        })
        
        /**
         * Click on the close button
         */
        const handleCancelClick = () => {
            _hide()
        }
        const handleConfirmClick = (ruleFormRef) => {
            ruleFormRef.validate((valid, fields) => {
                if (valid) {
                    v1alpha1Plugin(data.formData).then(e => {
                        data.addSuccess = true;
                        ElMessage({
                            type: 'success',
                            message: 'success',
                            onClose(){
                                _hide(true)
                            }
                        })
                    }).catch(e => {
                        let obj = JSON.parse(e.request.response) || {};
                        if (obj.message) {
                            ElMessage({
                                type: 'error',
                                message: obj.message
                            })
                        }
                    })
                }
            })
        }
        const handleDrawerClosed = () => {
            _hide(true)
            if(data.addSuccess){
                data.addSuccess = false;
                cxt.emit('success', true)
            }
        }
        const _hide = (bl) => {
            data.formData = {
                "domain": "",
                "label": ""
            }
            !bl && cxt.emit('update:modelValue', false)
        }
        return {
            ruleFormRef,
            ...toRefs(data),
            handleCancelClick,
            handleConfirmClick,
            handleDrawerClosed
        }
    }
}
</script>