from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(name='Test User', email='test@example.com', team='Test', is_active=True)
        self.assertEqual(user.name, 'Test User')

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Test Team', description='A test team')
        self.assertEqual(team.name, 'Test Team')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        activity = Activity.objects.create(user='Test User', activity_type='Test', duration=10, calories_burned=100, date='2026-02-20')
        self.assertEqual(activity.activity_type, 'Test')

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        entry = Leaderboard.objects.create(user='Test User', score=100, rank=1)
        self.assertEqual(entry.rank, 1)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Test Workout', description='Test', difficulty='Easy')
        self.assertEqual(workout.name, 'Test Workout')
