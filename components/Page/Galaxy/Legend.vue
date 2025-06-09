<template>
	<div class="flex flex-col gap-1 w-72">
		<div class="flex justify-between">
			<div>Сильный игрок</div>
			<div><span class="sdivong">S</span></div>
		</div>
		<div class="flex justify-between">
			<div>Слабый игрок</div>
			<div><span class="noob">N</span></div>
		</div>
		<div class="flex justify-between">
			<div>Режим отпуска</div>
			<div><span class="vacation">U</span></div>
		</div>
		<div class="flex justify-between">
			<div>Заблокирован</div>
			<div><span class="blocked">G</span></div>
		</div>
		<div class="flex justify-between">
			<div>Неактивен 7 дней</div>
			<div><span class="inactive">i</span></div>
		</div>
		<div class="flex justify-between">
			<div>Неактивен 28 дней</div>
			<div><span class="longinactive">iI</span></div>
		</div>
		<div class="flex justify-between">
			<div><span class="negative">Администратор</span></div>
			<div><span class="negative">A</span></div>
		</div>
		<div class="flex justify-between">
			<div><span class="positive">Оператор</span></div>
			<div><span class="positive">GO</span></div>
		</div>
		<div class="flex justify-between">
			<div><span class="neudival">Супер оператор</span></div>
			<div><span class="neudival">SGO</span></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "galaxy-legend",
	}
</script>