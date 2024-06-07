<template>
    <div class="user-table__wrap">
        <v-input v-model="search" placeholder="Поиск" />
        <v-table class="user-table">
            <thead>
                <tr>
                    <th>Аватар</th>
                    <th>ФИО</th>
                    <th>Пол</th>
                    <th>Страна</th>
                    <th>Дата рождения</th>
                    <th>Адрес электронной почты</th>
                    <th>Телефон</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.login.uuid">
                    <td>
                        <img class="user-table__avatar" :src="user.picture.medium" alt="avatar" />
                    </td>
                    <td>{{ `${user.name.title} ${user.name.first} ${user.name.last}` }}</td>
                    <td>{{ user.gender }}</td>
                    <td>{{ user.location.country }}</td>
                    <td>{{ new Date(user.dob.date).toLocaleDateString('en-US') }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                </tr>
            </tbody>
        </v-table>
        <v-pagination v-model="page" :total="totalPages" />
    </div>
</template>

<script setup lang="ts">
import { VTable, VInput } from '@/shared/ui'
import { ref, watch } from 'vue'
import { getUsers, type User } from '@/entities/User'
import { VPagination } from '@/shared/ui'
import { useRouter, useRoute, type LocationQueryRaw } from 'vue-router'

const router = useRouter()
const route = useRoute()
const users = ref<User[]>([])
const page = ref<number>(+(route.query.page || 1))
const totalPages = ref<number>(0)
const search = ref<string>(route.query.search?.toString() || '')

const fetchUsers = async () => {
    const { items, totalPages: total } = await getUsers({
        page: page.value,
        search: search.value,
        perPage: 5
    })

    users.value = items
    totalPages.value = total
}

const setQueryParams = (queryParams: LocationQueryRaw) => {
    router.replace({ query: queryParams })
}

watch(
    [page, search],
    () => {
        fetchUsers()
        setQueryParams({ page: page.value, search: search.value })
    },
    { immediate: true }
)
watch(search, () => {
    page.value = 1
})
</script>

<style lang="scss" scoped>
.user-table {
    &__wrap {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
    &__avatar {
        width: 72px;
        height: 72px;
    }
}
</style>
