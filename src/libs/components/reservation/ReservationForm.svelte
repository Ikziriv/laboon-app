<script lang="ts">

</script>

<form >
	<div class="grid grid-cols-1 gap-2 mt-4">
		<div>
			<label class="text-xs font-semibold dark:text-white" for="name">Name</label>
			<input id="rsvName" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
		</div>

		<div>
			<label class="text-xs font-semibold dark:text-white" for="phone">Phone</label>
			<input id="phone" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
		</div>

		<div>
			<label class="text-xs font-semibold dark:text-white" for="text">Description</label>
			<input id="text" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
		</div>

		<div>
			<label class="text-xs font-semibold dark:text-white" for="email">Email</label>
			<input id="email" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
		</div>

		<div>
			<label class="text-xs font-semibold dark:text-white" for="sailboat">Sailboat</label>
			<input id="rsvCode" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
		</div>
	</div>

	<div class="flex justify-end mt-6">
		<button type="submit" class="w-full px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add Reservation</button>
	</div>
</form>