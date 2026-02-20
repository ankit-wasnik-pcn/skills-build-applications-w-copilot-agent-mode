from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes team')
        dc = Team.objects.create(name='DC', description='DC superheroes team')

        # Users
        users = [
            User(name='Tony Stark', email='tony@marvel.com', team=marvel.name, is_active=True),
            User(name='Steve Rogers', email='steve@marvel.com', team=marvel.name, is_active=True),
            User(name='Bruce Wayne', email='bruce@dc.com', team=dc.name, is_active=True),
            User(name='Clark Kent', email='clark@dc.com', team=dc.name, is_active=True),
        ]
        for user in users:
            user.save()

        # Workouts
        workouts = [
            Workout(name='Super Strength', description='Strength training', difficulty='Hard'),
            Workout(name='Flight Training', description='Aerobic workout', difficulty='Medium'),
        ]
        for workout in workouts:
            workout.save()

        # Activities
        activities = [
            Activity(user='Tony Stark', activity_type='Running', duration=30, calories_burned=300, date=date.today()),
            Activity(user='Steve Rogers', activity_type='Cycling', duration=45, calories_burned=400, date=date.today()),
            Activity(user='Bruce Wayne', activity_type='Swimming', duration=60, calories_burned=500, date=date.today()),
            Activity(user='Clark Kent', activity_type='Flying', duration=120, calories_burned=1000, date=date.today()),
        ]
        for activity in activities:
            activity.save()

        # Leaderboard
        leaderboard = [
            Leaderboard(user='Tony Stark', score=1200, rank=2),
            Leaderboard(user='Steve Rogers', score=1300, rank=1),
            Leaderboard(user='Bruce Wayne', score=1100, rank=3),
            Leaderboard(user='Clark Kent', score=900, rank=4),
        ]
        for entry in leaderboard:
            entry.save()

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data!'))
