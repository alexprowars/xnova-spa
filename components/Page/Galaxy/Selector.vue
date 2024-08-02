<template>
	<form ref="form" class="page-galaxy-select" @submit.prevent="change">
		<div class="row">
			<div class="col-12 d-sm-none">
				<GalaxySelectorShortcut :items="shortcuts" v-model="shortcut"/>
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
								<button :disabled="galaxy === 1" @click.prevent="changeByDirection('galaxyLeft')">&lt;-</button>
							</th>
							<th>
								<input name="galaxy" v-model.number="inputGalaxy" maxlength="3" tabindex="1" min="1" type="number">
							</th>
							<th>
								<button :disabled="galaxy >= galaxyMax" @click.prevent="changeByDirection('galaxyRight')">-&gt;</button>
							</th>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="col-sm-4 d-none d-sm-block">
				<GalaxySelectorShortcut :items="shortcuts" :galaxy="galaxy" :system="galaxy" v-model="shortcut" @input="shortcutChange"/>
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
								<button :disabled="system === 1" @click.prevent="changeByDirection('systemLeft')">&lt;-</button>
							</th>
							<th>
								<input name="system" v-model.number="inputSystem" maxlength="3" tabindex="2" min="1" type="number">
							</th>
							<th>
								<button :disabled="system >= systemMax" @click.prevent="changeByDirection('systemRight')">-&gt;</button>
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
	import { computed, ref, watch } from 'vue';

	const props = defineProps({
		galaxy: {
			type: Number,
			default: 1
		},
		galaxyMax: {
			type: Number,
			default: 1
		},
		system: {
			type: Number,
			default: 1
		},
		systemMax: {
			type: Number,
			default: 1
		},
		shortcuts: {
			type: Array,
			default: () => []
		}
	});

	const emit = defineEmits(['change']);

	const inputGalaxy = computed(() => props.galaxy);
	const inputSystem = computed(() => props.system);
	const shortcut = ref(null);

	resetShortcut();

	watch(() => [props.galaxy, props.system], () => resetShortcut());

	function shortcutChange(val) {
		emit('change', {
			galaxy: val.galaxy, system: val.system,
		});
	}

	function resetShortcut() {
		shortcut.value = props.shortcuts.find((item) =>
			item['galaxy'] === props.galaxy && item['system'] === props.system
		) || null;
	}

	function changeByDirection(direction) {
		let coords = {
			galaxy: props.galaxy,
			system: props.system,
		}

		if (direction === 'galaxyLeft') {
			coords.galaxy -= 1;
		} else if (direction === 'galaxyRight') {
			coords.galaxy += 1;
		}

		if (direction === 'systemLeft') {
			coords.system -= 1;
		} else if (direction === 'systemRight') {
			coords.system += 1;
		}

		emit('change', coords);
	}

	function change() {
		emit('change', {
			galaxy: inputGalaxy.value,
			system: inputSystem.value,
		});
	}
</script>