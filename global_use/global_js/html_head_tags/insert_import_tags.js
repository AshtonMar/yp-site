// function insert_head_tags(page_name) {
// 	const head_tag = document.getElementById("headtag");

// 	const head_tags = `
// 		<meta charset="UTF-8" />
// 		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
// 		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
// 		<link rel="shortcut icon" type="image/png" href="./global_use/global_images/${page_name}.png" />
// 		<link rel="stylesheet" href="./global_use/global_css/components.css">
// 		<script src="./global_use/global_js/components/components.js"></script>
// 		<link rel="stylesheet" href="./page_styling/${page_name}/${page_name}.css">
// 		<script src="./page_functionality/${page_name}/${page_name}.js"></script>
// 		<script src="https://kit.fontawesome.com/4394260882.js" crossorigin="anonymous"></script>
// 		<title>Forest Village YP Site</title>
// 	`
// 	head_tag.innerHTML += head_tags;
// }

// insert_head_tags(window.location.pathname.split("/")[1].split(".")[0]);
