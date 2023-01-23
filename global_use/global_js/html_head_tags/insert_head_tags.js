function insert_head_tags(page_name) {
	const head_tag = document.getElementById("headtag");
	console.log(head_tag);
	const head_tags = `
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="shortcut icon" type="image/png" href="./images/${page_name}.png" />
		<link rel="stylesheet" href="./${page_name}/${page_name}-style/${page_name}.css">
		<link rel="stylesheet" href="./preloader/preloader.css">
		<script src="./preloader/preloader.js" defer></script>
		<script src="./${page_name}/${page_name}-script/${page_name}.js" defer></script>
		<script src="https://kit.fontawesome.com/4394260882.js" defer crossorigin="anonymous"></script>
		<title>Forest Village YP Site</title>
	`

}

insert_head_tags(window.location.pathname.split("/")[1].split(".")[0]);
