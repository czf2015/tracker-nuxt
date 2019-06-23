<template>
  <div class="scan">
    <el-button type="text" @click="centerDialogVisible = true">
      <i class="fa fa-qrcode fa-lg" />
    </el-button>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="5rem"
      center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false
    }
  }
}
</script>