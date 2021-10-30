import University from '../models/university';
const register = async (req, res) => {
	const { name, program, length, description, tuition } = req.body;
	if (!name || !program || !length || !description || !tuition) {
		return res.json({ error: 'the values should be provide' });
	}
	const exist = await University.findOne({ name });
	if (exist) {
		return res.json({ error: 'already exist' });
	}
	const university = new University({ name, program, length, description, tuition });
	try {
		university.save();
		res.json({ success: 'new university create' });
		console.log(name, program, length, description, tuition);
	} catch (error) {
		console.log(error);
		res.status(400).send('try again');
	}
};

const getUniversities = async (req, res) => {
	const universities = await University.find({});
	res.json(universities);
};
export { register, getUniversities };
