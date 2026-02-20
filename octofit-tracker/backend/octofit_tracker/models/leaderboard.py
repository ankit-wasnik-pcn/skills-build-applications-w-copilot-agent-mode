from djongo import models
class Leaderboard(models.Model):
    _id = models.ObjectIdField()
    user = models.CharField(max_length=100)
    score = models.IntegerField()
    rank = models.IntegerField()
    def __str__(self):
        return f"{self.user} - Rank {self.rank}"
