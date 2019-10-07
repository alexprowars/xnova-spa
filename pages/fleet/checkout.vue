<template>
	<router-form v-if="page" action="/fleet/send/">
		<input v-for="ship in page.ships" type="hidden" :name="'ship['+ship.id+']'" :value="ship['count']">
		<div class="table">
			<div class="row">
				<div class="c col-12">Отправка флота</div>
			</div>
			<div class="row">
				<div class="th col-6">Цель</div>
				<div class="th col-6 fleet-coordinates-input">
					<input type="number" name="galaxy" min="1" :max="page['galaxy_max']" v-model="page['target']['galaxy']">
					<input type="number" name="system" min="1" :max="page['system_max']" v-model="page['target']['system']">
					<input type="number" name="planet" min="1" :max="page['planet_max']" v-model="page['target']['planet']">
					<select name="planet_type" v-model="page['target']['planet_type']">
						<option v-for="(item, index) in $t('PLANET_TYPE')" :value="index">{{ item }}</option>
					</select>
				</div>
			</div>
			<div class="row">
				<div class="th col-6">Скорость</div>
				<div class="th col-6">
					<select name="speed" v-model="speed" @change="info">
						<option v-for="i in 10" :value="11 - i">{{ (11 - i) * 10 }}</option>
					</select> %
				</div>
			</div>
			<div class="row">
				<div class="th col-6">Расстояние</div>
				<div class="th col-6">{{ distance|number }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Продолжительность полёта (к цели)</div>
				<div class="th col-6">{{ duration|time(':', true) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Время прибытия (к цели)</div>
				<div class="th col-6">{{ target_time|date('d.m.Y H:i:s') }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Максимальная скорость</div>
				<div class="th col-6">{{ maxspeed|number }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Потребление топлива</div>
				<div class="th col-6"><span :class="[storage > consumption ? 'positive' : 'negative']">{{ consumption|number }}</span></div>
			</div>
			<div class="row">
				<div class="th col-6">Грузоподъёмность</div>
				<div class="th col-6"><span :class="[storage > consumption ? 'positive' : 'negative']">{{ storage|number }}</span></div>
			</div>
			<div class="row">
				<div class="c col-12">Ссылки <nuxt-link to="/fleet/shortcut/">(Просмотр / Редактирование)</nuxt-link></div>
			</div>

			<div v-if="page['shortcuts'].length > 0" class="row">
				<div v-for="link in page['shortcuts']" class="th col-6" :class="{'col-12': page['shortcuts'].length === 1}">
					<a @click.prevent="setTarget(link[1], link[2], link[3], link[4])">
						{{ link[0] }} {{ link[1] }}:{{ link[2] }}:{{ link[3] }}
						<span v-if="link[4] === 1">(P)</span>
						<span v-if="link[4] === 2">(D)</span>
						<span v-if="link[4] === 3">(L)</span>
					</a>
				</div>
			</div>
			<div v-else class="row">
				<div class="th col-12"><nuxt-link to="/fleet/shortcut/add/" class="button">Добавить</nuxt-link></div>
			</div>

			<div v-if="page['planets'].length > 0" class="row">
				<div class="c col-12">Планеты</div>
			</div>
			<div v-if="page['planets'].length > 0" class="row">
				<div v-for="(planet, i) in page['planets']" class="th" :class="['col-'+(page['planets'].length % 2 > 0 && i === page['planets'].length - 1 ? 12 : 6)]">
					<a @click.prevent="setTarget(planet['galaxy'], planet['system'], planet['planet'], planet['planet_type'])">
						{{ planet['name'] }} {{ planet['galaxy'] }}:{{ planet['system'] }}:{{ planet['planet'] }}
					</a>
				</div>
			</div>

			<div v-if="page['moons'].length > 0" class="row">
				<div class="c col-12">
					Межгалактические врата
					<span v-if="page['gate_time'] > 0" class="small">(заряжено через {{ page['gate_time']|time(':', true) }})</span>
				</div>
			</div>
			<div v-if="page['moons'].length > 0" class="row">
				<div v-for="(moon, i) in page['moons']" class="th" :class="['col-'+(page['moons'].length % 2 > 0 && i === page['moons'].length - 1 ? 12 : 6)]">
					<input type="radio" name="moon" :value="moon['id']" :id="'moon'+moon['id']">
					<label :for="'moon'+moon['id']">{{ moon['name'] }} [{{ moon['galaxy'] }}:{{ moon['system'] }}:{{ moon['planet'] }}] <span v-if="moon['timer'] > 0">{{ moon['timer']|time(':', true) }}</span></label>
				</div>
			</div>

			<div v-if="page['alliances'].length > 0" class="row">
				<div class="c col-12">Боевые союзы</div>
			</div>
			<div v-for="(row, index) in page['alliances']" class="row">
				<div class="th col-12">
					<a @click.prevent="allianceSet(index)">({{ row['name'] }})</a>
				</div>
			</div>

			<div class="row">
				<div class="th col-6">
					<table class="table">
						<tr>
							<td class="c" colspan="2">Миссия</td>
						</tr>
						<tr v-for="mission in page['missions']">
							<th style="text-align: left !important">
								<input :id="'m_'+mission" type="radio" name="mission" v-model="page['mission']" :value="mission">
								<label :for="'m_'+mission">{{ $t('FLEET_MISSION.'+mission) }}</label>

								<center v-if="mission === 15" class="negative">
									Внимание во время экспедиции возможна потеря флота!
								</center>
							</th>
						</tr>
						<tr v-if="page['missions'].length === 0">
							<th class="negative">Миссия невозможна</th>
						</tr>
						<tr>
							<th>Время прилёта: {{ target_time|date('d.m.Y H:i:s') }}</th>
						</tr>
					</table>
				</div>
				<div class="th col-6">
					<table class="table">
						<tr>
							<td colspan="3" class="c">Сырьё</td>
						</tr>
						<tr>
							<th>Металл</th>
							<th><a @click.prevent="maxRes('metal')">макс.</a></th>
							<th><input name="resource[metal]" v-model="resource.metal" alt="Металл" size="10" type="text"></th>
						</tr>
						<tr>
							<th>Кристалл</th>
							<th><a @click.prevent="maxRes('crystal')">макс.</a></th>
							<th><input name="resource[crystal]" v-model="resource.crystal" alt="Кристалл" size="10" type="text"></th>
						</tr>
						<tr>
							<th>Дейтерий</th>
							<th><a @click.prevent="maxRes('deuterium')">макс.</a></th>
							<th><input name="resource[deuterium]" v-model="resource.deuterium" alt="Дейтерий" size="10" type="text"></th>
						</tr>
						<tr>
							<th>Остаток</th>
							<th colspan="2">
								<span :class="[capacity >= 0 ? 'positive' : 'negative']">{{ capacity|number }}</span>
							</th>
						</tr>
						<tr>
							<th colspan="3"><a @click.prevent="maxResAll">Всё сырьё</a> | <a @click.prevent="clearResAll">Обнулить</a></th>
						</tr>
						<tr>
							<th colspan="3">&nbsp;</th>
						</tr>

						<tr v-if="page['mission'] === 15 && page['missions'].indexOf(15) >= 0" class="mission m_15">
							<td class="c" colspan="3">Время экспедиции</td>
						</tr>
						<tr v-if="page['mission'] === 15 && page['missions'].indexOf(15) >= 0" class="mission m_15">
							<th colspan="3">
								<select name="expeditiontime">
									<option v-for="i in page['expedition_hours']" :value="i">{{ i }} ч.</option>
								</select>
							</th>
						</tr>

						<tr v-if="page['mission'] === 5 && page['missions'].indexOf(5) >= 0" class="mission m_5">
							<td class="c" colspan="3">Оставаться часов на орбите</td>
						</tr>
						<tr v-if="page['mission'] === 5 && page['missions'].indexOf(5) >= 0" class="mission m_5">
							<th colspan="3">
								<select name="holdingtime" v-model="hold_hours">
									<option value="0">0</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="8">8</option>
									<option value="16">16</option>
									<option value="32">32</option>
								</select>
								<div v-if="hold > 0">
									<br>Потребуется <span class="positive">{{ hold|number }}</span> дейтерия
								</div>
							</th>
						</tr>
					</table>
				</div>
			</div>
			<div v-if="page['missions'].length > 0" class="row">
				<div class="th col-12">
					<input value="Далее" type="submit">
				</div>
			</div>
		</div>

		<input type="hidden" name="alliance" v-model="alliance">
		<input type="hidden" name="fleet" :value="page['fleet']">
		<input type="hidden" name="mission" :value="page['mission']">
	</router-form>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
	import { getDistance, getSpeed, getDuration, getConsumption, getStorage } from '~/utils/fleet'

	export default {
		name: 'fleet-one',
		async asyncData ({ store }) {
			return await store.dispatch('loadPage')
		},
		watchQuery: true,
		middleware: 'auth',
		computed: {
			resources () {
				return this.$store.state.resources
			},
			position () {
				return this.$store.state.user.position;
			},
			hold ()
			{
				let hold = 0

				if (this.page['mission'] === 5)
					hold = this.page['ships'].reduce((summ, item) => item['stay'] * this.hold_hours, 0)

				return hold
			},
			capacity () {
				return this.storage - this.resource.metal - this.resource.crystal - this.resource.deuterium - this.hold
			},
		},
		data () {
			return {
				resource: {
					metal: 0,
					crystal: 0,
					deuterium: 0,
				},
				speed: 10,
				distance: 0,
				duration: 0,
				storage: 0,
				maxspeed: 0,
				consumption: 0,

				target_time: 0,
				target_timeout: null,

				alliance: 0,
				hold_hours: 1,
			}
		},
		watch: {
			target_time () {
				this.startTimer()
			},
			'page.target': {
				async handler ()
				{
					let ships = {}

					this.page['ships'].forEach((item) => {
						ships[item['id']] = item['count']
					})

					let data = await this.$post('/fleet/checkout/', {
						galaxy: this.page['target']['galaxy'],
						system: this.page['target']['system'],
						planet: this.page['target']['planet'],
						planet_type: this.page['target']['planet_type'],
						mission: 0,
						ship: ships,
					})
					.then((result) =>
					{
						delete result['page']['target']
						return result['page']
					})

					this.page = Object.assign(this.page, data)

					this.info()
				},
				deep: true,
			}
		},
		methods: {
			info ()
			{
				this.distance = getDistance(this.position, this.page['target'])
				this.maxspeed = getSpeed(this.page['ships'])

				this.duration = getDuration({
					factor: this.speed,
					distance: this.distance,
					max_speed: this.maxspeed,
					universe_speed: this.$store.state['speed']['fleet']
				})

				this.consumption = getConsumption({
					ships: this.page['ships'],
					duration: this.duration,
					distance: this.distance,
					universe_speed: this.$store.state['speed']['fleet']
				})

				this.storage = getStorage(this.page['ships']) - this.consumption

				this.clearTimer()
				this.target_time = this.$store.getters.getServerTime() + this.duration
			},
			startTimer ()
			{
				this.target_timeout = setTimeout(() =>
				{
					this.target_time = this.$store.getters.getServerTime() + this.duration

					if (this.page['gate_time'] > 0)
						this.page['gate_time']--

					this.page['moons'].forEach((item) =>
					{
						if (item['timer'] > 0)
							item['timer']--
					})

				}, 1000)
			},
			clearTimer () {
				clearTimeout(this.target_timeout)
			},
			setTarget (galaxy, system, planet, type)
			{
				this.page['target']['galaxy'] = galaxy
				this.page['target']['system'] = system
				this.page['target']['planet'] = planet

				if (typeof type === 'undefined')
					type = 1

				this.page['target']['planet_type'] = type
			},
			allianceSet (index)
			{
				let al = this.page['alliances'][index]

				this.alliance = al['id']
				this.setTarget(al['galaxy'], al['system'], al['planet'], al['planet_type'])
			},
			maxRes (type)
			{
				let current = this.resource.metal + this.resource.crystal + this.resource.deuterium
				current -= this.resource[type]

				let free = this.storage - current

				if (type === 'deuterium')
					this.resource[type] = Math.max(Math.min(Math.floor(this.resources[type]['current'] - this.consumption), free), 0)
				else
					this.resource[type] = Math.max(Math.min(Math.floor(this.resources[type]['current']), free), 0)
			},
			maxResAll ()
			{
				let free = this.storage - Math.floor(this.resources['metal']['current']) - Math.floor(this.resources['crystal']['current']) - Math.floor(this.resources['deuterium']['current'] - this.consumption)

				if (free < 0)
				{
					this.resource.metal = Math.max(Math.min(Math.floor(this.resources['metal']['current']), this.storage), 0)
					this.resource.crystal = Math.max(Math.min(Math.floor(this.resources['crystal']['current']), this.storage - this.resource.metal), 0)
					this.resource.deuterium = Math.max(Math.min(Math.floor(this.resources['deuterium']['current'] - this.consumption), this.storage - this.resource.metal - this.resource.crystal), 0)
				}
				else
				{
					this.resource.metal = Math.max(Math.floor(this.resources['metal']['current']), 0)
					this.resource.crystal = Math.max(Math.floor(this.resources['crystal']['current']), 0)
					this.resource.deuterium = Math.max(Math.floor(this.resources['deuterium']['current'] - this.consumption), 0)
				}
			},
			clearResAll () {
				this.resource.metal = this.resource.crystal = this.resource.deuterium = 0
			},
		},
		mounted () {
			this.info()
		},
		destroyed () {
			this.clearTimer()
		}
	}
</script>