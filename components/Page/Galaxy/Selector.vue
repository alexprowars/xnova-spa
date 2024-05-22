<template>
	<form ref="form" action="" class="page-galaxy-select" @submit.prevent="change">
		<input type="hidden" name="direction" v-model="direction">

		<div class="row">
			<div class="col-12 d-sm-none">
				<GalaxySelectorShortcut :items="shortcuts"/>
			</div>
			<div class="separator d-sm-none"></div>
			<div class="col-sm-4 col-6">
				<table style="margin: 0 auto">
					<tbody>
						<tr>
							<td class="c" colspan="3">
								Галактика
							</td>
						</tr>
						<tr>
							<th>
								<input value="&lt;-" type="button" @click.prevent="direction = 'galaxyLeft'">
							</th>
							<th>
								<input name="galaxy" v-model.number="inputGalaxy" maxlength="3" tabindex="1" min="1" type="number">
							</th>
							<th>
								<input value="-&gt;" type="button" @click.prevent="direction = 'galaxyRight'">
							</th>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="col-sm-4 d-none d-sm-block">
				<GalaxySelectorShortcut :items="shortcuts"/>
			</div>
			<div class="col-sm-4 col-6">
				<table style="margin: 0 auto">
					<tbody>
						<tr>
							<td class="c" colspan="3">
								Солнечная система
							</td>
						</tr>
						<tr>
							<th>
								<input value="&lt;-" type="button" @click.prevent="direction = 'systemLeft'">
							</th>
							<th>
								<input name="system" v-model.number="inputSystem" maxlength="3" tabindex="2" min="1" type="number">
							</th>
							<th>
								<input value="-&gt;" type="button" @click.prevent="direction = 'systemRight'">
							</th>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</form>
</template>

<script setup>
	import GalaxySelectorShortcut from './SelectorShortcut.vue'
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';
	import { computed, ref, watch } from 'vue';

	const props = defineProps({
		galaxy: {
			type: Number,
			default: 1
		},
		system: {
			type: Number,
			default: 1
		},
		shortcuts: {
			type: Array,
			default: () => []
		}
	});

	const emit = defineEmits(['change']);

	const direction = ref('');
	const inputGalaxy = computed(() => props.galaxy);
	const inputSystem = computed(() => props.system);

	watch(direction, (val) => {
		if (val !== '') {
			change();
		}
	});

	function change() {
		emit('change', {
			galaxy: inputGalaxy.value,
			system: inputSystem.value,
			direction: direction.value,
		});

		direction.value = '';
	}
</script>