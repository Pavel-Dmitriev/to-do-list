/* Написать простое ToDo App — список задач с возможностью добавления новых пунктов и смены статуса готовности каждого пункта (сделано/не сделано).
Страница должна состоять из:
 1. самого списка задач (нумерованный список <ol>, пункты-задачи — <li>);
 2. поля для ввода названия новой задачи (<input type=“text”);
 3. кнопки «Добавить».

При нажатии на кнопку «Добавить» задача добавляется в конец списка в качестве нового пункта <li>.
Если название задачи не введено, то появляется ошибка (alert или другая реализация) с просьбой заполнить поле.
Считать значение, введенное в поле, можно при помощи document.querySelector(‘input’).value.
При клике на любую задачу в списке она помечается как выполненная (становится зачеркнутой, тут пригодится CSS-свойство text-decoration: line-through). При повторном клике зачеркивание исчезает. */

const onPageLoaded = () => {


	const textInput = document.querySelector('.input-task');
	const toDoList = document.querySelector('.to-do-list');
	const toDoLists = [];

	// Создание и добавление списка с кнопкой удалить
	const createToDoList = (taskText) => {

		toDoLists.push(taskText);
		const li = document.createElement('li');
		const newToDoList = textInput.value;
		li.classList.add('list');

		const deleteBtn = document.createElement('button');
		deleteBtn.classList.add('icon-delete');

		toDoList.appendChild(li).append(newToDoList, deleteBtn);

		deleteToDoListElement(deleteBtn);
	}

	const deleteToDoListElement = (element) => {
		element.addEventListener("click", (event) => {
			element.parentElement.remove();
			event.stopPropagation();
		});
	}

	const btnAdd = document.querySelector('.btn-add');

	btnAdd.addEventListener('click', () => {

		// Проверка на дубликат и добавление дела в список дел
		const addDuplicateCase = (taskText) => {
			const dublicate = toDoLists.some((item) => item.toLowerCase() === taskText.toLowerCase()) ? true : false;
			if (dublicate) {
				const confirmAddDublicateTask = confirm('Вы действительно хотите добавить дубликат задачи?');
				if (confirmAddDublicateTask) {
					createToDoList(taskText);
				}
			} else {
				createToDoList(taskText);
			}
		}

		if (textInput.value == 0) {
			alert('Вы ничего не ввели.');
		} else {
			addDuplicateCase(textInput.value);
			textInput.value = '';
		}

		// Зачеркивание выполненного дела
		const buts = document.querySelectorAll('li');

		buts.forEach(function (but) {
			but.onclick = function () {
				but.classList.toggle('done');
			}
		});
	});

}
document.addEventListener('DOMContentLoaded', onPageLoaded);