require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_URI}/Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const personSchema = new Schema({
	name: { type: String, required: true },
	age: Number,
	favoriteFoods: [String],
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
	const newPerson = new Person({ name: 'Marina', age: 30, favoriteFoods: ['canjica'] });
	
	newPerson.save(function(err, data) {
		if (err) {
			console.error(err);
			return done(err);
		}
		done(null, data);
	});
};

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, function(err, data) {
		if (err) {
			console.error(err);
			return done(err);
		}
		done(null, data);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, function(err, data) {
		if (err) {
			console.error(err);
			return done(err);
		}
		done(null, data);
	});
};

const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, function(err, data) {
		if (err) {
			console.error(err);
			return done(err);
		}
		done(null, data);
	});
};

const findPersonById = (personId, done) => {
	Person.findById(personId, function(err, data) {
		if (err) {
			console.error(err);
			return done(err);
		}
		done(null, data);
	});
};

const findEditThenSave = (personId, done) => {
	Person.findById(personId, function(err, person) {
		if (err) {
			console.error(err);
			return done(err);
		}

		const foodToAdd = "hamburger";
		person.favoriteFoods.push(foodToAdd);

		person.save(function(err, data) {
			if (err) {
				console.error(err);
				return done(err);
			}
			done(null, data);
		});
	});
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;

	Person.findOneAndUpdate(
		{ name: personName },
		{ age: ageToSet },
		{ new: true },
		function(err, data) {
			if (err) {
				console.error(err);
				return done(err);
			}

			done(null, data);
		},
	);
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, function(err, data) {
		if (err) {
			console.error(err);
			done(err);
		}

		done(null, data);
	});
};

const removeManyPeople = (done) => {
	const nameToRemove = "Mary";

	Person.remove({ name: nameToRemove }, function(err, data) {
		if (err) {
			console.error(err);
			done(err);
		}

		done(null, data);
	});
};

const queryChain = (done) => {
	const foodToSearch = "burrito";
	
	Person
		.find({ favoriteFoods: foodToSearch })
		.sort({ name: 'asc' })
		.limit(2)
		.select('-age')
		.exec(function(err, data) {
			if (err) {
				console.error(err);
				done(err);
			}
	
			done(null, data);
		});
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
