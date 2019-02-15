const express=require('express')
const router=express.Router()
const fileupload=require('express-fileupload');
const cors=require('cors')
const bodyParser=require('body-parser')



//middlewares
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());
router.use(fileupload())


//routes
router.post('/upload', (req, res, next) => {
	// console.log(req);
	let imageFile = req.files.file;

	imageFile.mv(`${__dirname}/docs/${req.body.filename}.pdf`, err => {
		if (err) {
			return res.status(500).send(err);
		}

		res.json({ file: `docs/${req.body.filename}.pdf` });
		console.log(res.json);
	});
});

module.exports = router;
