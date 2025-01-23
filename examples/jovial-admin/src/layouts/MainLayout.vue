<script lang="ts" setup>
import { JvContainer } from 'jovial-ui/components/JvContainer'
import { JvList, JvListGroup, JvListSubheader } from 'jovial-ui/components/JvList'
</script>

<template>
  <JvContainer>
    <template #aside>
      <JvList>
        <JvListSubheader>系统导航</JvListSubheader>
        <JvListGroup>
          <template #title>
            仪表盘
          </template>
          <JvList>
            <router-link to="/dashboard">
              概览
            </router-link>
            <router-link to="/analytics">
              数据分析
            </router-link>
          </JvList>
        </JvListGroup>

        <JvListGroup>
          <template #title>
            用户管理
          </template>
          <JvList>
            <router-link to="/users">
              用户列表
            </router-link>
            <router-link to="/roles">
              角色权限
            </router-link>
          </JvList>
        </JvListGroup>
      </JvList>
    </template>

    <template #main>
      <router-view />
    </template>
  </JvContainer>
</template>
