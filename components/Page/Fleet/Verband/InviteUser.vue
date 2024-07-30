<template>
	<form method="post" @submit.prevent="invite">
		<div v-if="friends.length > 0 || alliance.length > 0">
			<select v-model="userId" size="10" style="width:75%;">
				<option value="">-не выбрано-</option>
				<optgroup v-if="friends.length > 0" label="Список друзей">
					<option v-for="user in friends" :value="user['id']">{{ user['username'] }}</option>
				</optgroup>
				<optgroup v-if="alliance.length > 0" label="Члены альянса">
					<option v-for="user in alliance" :value="user['id']">{{ user['username'] }}</option>
				</optgroup>
			</select>
			<div class="separator"></div>
		</div>
		<input type="text" v-model="userName" size="40" placeholder="Введите игровой ник">
		<br>
		<button type="submit">Пригласить</button>
	</form>
</template>

<script setup>
	import { useApiSubmit, refreshNuxtData } from '#imports';
	import { ref } from 'vue';

	const props = defineProps({
		id: Number,
		friends: Array,
		alliance: Array,
	});

	const userId = ref('');
	const userName = ref('');

	function invite() {
		useApiSubmit('/fleet/verband/' + props['id'] + '/user', {
			user_id: userId.value,
			user_name: userName.value,
		}, () => {
			refreshNuxtData('page-verband.' + props['id']);
		});
	}
</script>