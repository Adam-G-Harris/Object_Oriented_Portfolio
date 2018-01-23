
// This is all completely arbitrary.

// I'm treating all html tags and respective attributes as Objects, Objects in Objects, & Objects in Objects in Objects... -_-

// Also I made this last night so please forgive any minor overlooks, as it was written in one night.

// I'm a dumbass.

window.onload = () => {

	/* ----- DECLARING GLOBAL VARIABLES ----- */

	let dynamicContent = document.getElementById('dynamicContent'),

		dynamicTitle = document.getElementById('dynamicTitle'),

		finalTagArray = [],

		portfolioP = false,

		contactP = false,

		aboutP = true,

		total = 0,

		template;

	let pageInformation = getContent(),

		navDOM = document.getElementById('nav');

	navDOM.addEventListener('click', pageTrigger);

	dynamicTitle.textContent = pageInformation.titles.aboutTitle;

	dynamicContent.innerHTML = pageInformation.content.about;

	/* ----- HAS TO BE A PARENT OBJECT WITH CHILDREN OBJECTS ----- */

	Object.prototype.tag = function () {

		let propArray = Object.entries(this);

		propArray.forEach(innerObject => {

			if (typeof innerObject !== 'object') {

				return;

			} else {

				innerObjectPropsHandler(Object.entries(innerObject));

			}

		});

	};

	/* ----- ORGANIZES AND FORMATS CHILD PROPERTIES INTO ATTRIBUTES ----- */

	function normalPropsHandler(name, attributes, special, count) {

		let str = ``;

		let arrangeNum = name.slice(name.search(/[\d]/g), name.length);

		name = name.slice(0, name.search(/[\d]/g));

		if (typeof special !== 'undefined') {

			for (let key in attributes) {

				if (count === 0) {

					str = `<${name}`;

				}

				if (count === Object.keys(attributes).length) {

					if (special.text !== undefined) {

						special.closing ? str += `>${special.text}</${name}>` : str += '>';

					} else {

						special.closing ? str += `></${name}>` : str += '>';

					}

					arrange(str, arrangeNum);

				}

				if (attributes.hasOwnProperty(key)) {

					let tagName = key;

					let tagInfo = attributes[key];

					str += ` ${tagName}='${tagInfo}'`;

				}

				count += 1;

			}

		} else if (typeof special === 'undefined') {

			console.log('ERROR: All Objects require a "special" property.');

		}

	}

	/* ----- SEPARATES SPECIFIC PARENT PROPERTIES ----- */

	function innerObjectPropsHandler(innerObjectArray) {

		let tagType = innerObjectArray[0][1];

		let tagTypeProps = innerObjectArray[1][1];

		if (tagTypeProps.hasOwnProperty('special')) {

			for (let prop in tagTypeProps) {

				if (prop === 'special') {

					let tempProp = tagTypeProps[prop];

					delete tagTypeProps[prop];

					normalPropsHandler(tagType, tagTypeProps, tempProp, 0);

				}

			}

		} else {

			normalPropsHandler(tagType, tagTypeProps, undefined, 0);

		}

	}

	/* ----- PUSHES THE FINAL PRODUCT TO THE DOM ----- */

	function arrange(str, num) {

		let tempArray = [];

		total += 1;

		finalTagArray.push(num += str);

		if (total > Object.keys(template).length - 1) {

			for (let i = 0; i < finalTagArray.length; i++) {

				let item = finalTagArray[i];

				let slicedNum = item.slice(0, item.search(/[<]/g)),

					slicedTag = item.slice(item.search(/[<]/g), item.length);

				tempArray[slicedNum] = slicedTag;

			}

			if (portfolioP) {

				dynamicContent.innerHTML = `<div id='showcase'>${tempArray.join('')}</div>`;

			} else if (contactP) {

				dynamicContent.innerHTML = `<form action="/arbitrary_server_page.php" id='contactForm'>${tempArray.join('')}</form>`;

			}

		}

	}

	/* ----- PAGE CHANGE HANDLER ----- */

	function pageTrigger(e) {

		switch (e.target.id) {

			case 'about':

				if (!aboutP) {

					dynamicTitle.textContent = pageInformation.titles.aboutTitle;

					dynamicContent.innerHTML = pageInformation.content.about;

					portfolioP = false;

					contactP = false;

					aboutP = true;

				}

				break;

			case 'contact':

				if (!contactP) {

					dynamicTitle.textContent = pageInformation.titles.contactTitle;

					// Resetting array due to leftover tags.

					finalTagArray = [];

					// portfolioP & contactP decide which tag the final array is put into.

					// They also stop a tab from being loaded if it's already selected.

					portfolioP = false;

					contactP = true;

					aboutP = false;

					formTemplate();

				}

				break;

			case 'portfolio':

				if (!portfolioP) {

					dynamicTitle.textContent = pageInformation.titles.portfolioTitle;

					finalTagArray = [];

					portfolioP = true;

					contactP = false;

					aboutP = false;

					portfolioTemplate();

				}

				break;

		}

	}

	function getContent() {

		return {

			titles: {

				aboutTitle: 'About Me',

				contactTitle: 'Contact',

				portfolioTitle: 'Portfolio'

			},

			content: {

				// Didn't have time to change the about section over to the Object method.

				about: `<div id="infoAbout"><img src="https://s3.amazonaws.com/filestore.rescuegroups.org/2420/pictures/animals/11925/11925518/52604863_500x500.jpg" alt="Kitten"><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam pariatur optio laboriosam consequatur quibusdam eos hic, voluptates odit harum labore placeat consectetur facilis magnam nobis itaque quasi doloribus adipisci quidem distinctio aut maxime reprehenderit excepturi reiciendis qui? Eaque, consequatur et?</p><br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ab ducimus sapiente cumque eveniet voluptatum repellat soluta harum, nemo animi, nostrum officia dolor et? Vitae et suscipit cupiditate inventore doloribus, eius rerum tempore aperiam quisquam. Voluptate, fugiat? Et, tenetur consectetur perspiciatis accusamus sequi eos incidunt impedit nulla placeat illo in! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime error magni adipisci assumenda quia eum hic non amet doloribus qui repudiandae tempore labore perspiciatis facere quis debitis.</p></div>`

			}

		};

	}

	/* ----- OBJECT TEMPLATE FOR CONTACT TAB ----- */

	function formTemplate() {

		template = {

			div0: {

				class: 'formTitle',

				special: {

					text: 'Name',

					closing: true

				}

			},

			div2: {

				class: 'formTitle',

				special: {

					text: 'Email',

					closing: true

				}

			},

			div4: {

				class: 'formTitle',

				special: {

					text: 'Message',

					closing: true

				}

			},

			input1: {

				class: 'formInput',

				type: 'text',

				placeholder: 'John Smith...',

				special: {

					closing: false

				}

			},

			input3: {

				class: 'formInput',

				type: 'text',

				placeholder: 'example@gmail.com...',

				special: {

					closing: false

				}

			},

			input6: {

				class: 'formSubmit',

				type: 'button',

				value: 'Submit',

				special: {

					closing: false

				}

			},

			textarea5: {

				class: 'formTextArea',

				special: {

					closing: true

				}

			}

		};

		template.tag();

	}

	/* ----- OBJECT TEMPLATE FOR PORTFOLIO TAB ----- */

	function portfolioTemplate() {

		// There's for sure a better way to make multiple Objects with different properties and differing child Objects.

		// I just had more important things to optimize last night.

		template = {

			div0: makeObject(),

			div2: makeObject(),

			div3: makeObject(),

			div1: makeObject(),

			div5: makeObject(),

			div4: makeObject(),

			div6: makeObject(),

			div8: makeObject(),

			div7: makeObject(),

			div9: makeObject(),

			div11: makeObject(),

			div10: makeObject(),

			div12: makeObject(),

			div14: makeObject(),

			div13: makeObject(),

			div15: makeObject(),

			div17: makeObject(),

			div16: makeObject(),

			div18: makeObject(),

			div19: makeObject()

		}

		template.tag();

	}

	function makeObject() {

		temp = {

			class: 'project',

			special: {

				closing: true

			}

		}

		return temp;

	}

};
